import { useSearchParams } from "@solidjs/router";
import {
	activities as activitiesApi,
	activitiesWeapons as activitiesWeaponsApi,
} from "infrastructure";
import {
	ShootingEntry,
} from "infrastructure/adapters/pocketbase";
import {
	Component,
	createEffect,
	createSignal,
	For,
	Setter,
	Show,
} from "solid-js";

import {
	Alert,
	AlertDescription,
	Button,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	ConditionalWrapper,
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	Label,
	SelectGridItem,
	SelectNative,
	Separator,
	showToast,
	Spinner,
	TextField,
	TextFieldAreaGridItem,
	TextFieldInput,
	TextFieldInputGridItem,
	TextFieldLabel,
} from "~/components";
import {
	Calibers,
	clubs,
} from "~/data";
import { useT } from "~/hooks/useT";
import { Activity, ActivityCreateInput, ActivityWeapon } from "~/schemas";
import { useStore } from "~/store";
import {
	ReadListResponse,
} from "~/types";
import {
	dateTimeLocale,
	dateTimeLocaleToday,
} from "~/utilities";

interface ManageActivityFormProps {
	modal?: boolean;
	modalControl?: Setter<boolean>;
	edit?: Activity;
}

interface ShootingEntryWithId extends ShootingEntry {
	existingId?: string;
}

export const ActivityForm: Component<ManageActivityFormProps> = (props) => {
	const {
		user,
		activitiesSet,
		weapons: storeWeapons,
	} = useStore();

	const t = useT();

	const [, searchParamsSet] = useSearchParams();

	const defaultFormValues = {
		club: "",
		date: dateTimeLocaleToday(),
		exercises: "",
		location: "",
		notes: "",
		owner: user().id,
		rangeMaster: "",
	};

	const defaultWeaponEntry = {
		weapon: "",
		caliber: "",
		rounds: 0,
	};

	const [form, formSet] = createSignal<ActivityCreateInput>(defaultFormValues);
	const [editForm, editFormSet] = createSignal<Activity>();
	const [loading, loadingSet] = createSignal(false);
	const [errorMessage, errorMessageSet] = createSignal<string | null>(null);
	const [title, titleSet] = createSignal<string>();
	const [shootingEntries, shootingEntriesSet] = createSignal<ShootingEntryWithId[]>([defaultWeaponEntry]);

	const closeModal = () => {
		if (props.modal && props.modalControl) {
			props.modalControl(false);
		}
	};

	const getWeaponById = (id: string) =>
		storeWeapons().find((item) => item.id === id);

	const getCalibersForWeapon = (weaponId: string): Calibers[] =>
		getWeaponById(weaponId)?.caliber ?? [];

	const addShootingEntry = () => {
		shootingEntriesSet((prev) => [
			...prev,
			defaultWeaponEntry,
		]);
	};

	const removeShootingEntry = (index: number) => {
		if (shootingEntries().length === 1) {
			shootingEntriesSet([defaultWeaponEntry]);
			return;
		}

		shootingEntriesSet((prev) => prev.filter((_, i) => i !== index));
	};

	const handleShootingEntryChange = (
		index: number,
		field: keyof ShootingEntry,
		value: string | number | Calibers[],
	) => {
		shootingEntriesSet((prev) => {
			const updated = [...prev];

			if (field === "weapon" && typeof value === "string") {
				const calibers = getCalibersForWeapon(value);

				updated[index] = {
					...updated[index],
					...defaultWeaponEntry,
					weapon: value,
					caliber: calibers.length === 1 ? calibers[0] : "",
				};
				return updated;
			}

			updated[index] = { ...updated[index], [field]: value };
			return updated;
		});
	};

	const handleInputChange = (field: string, value: string | string[]) => {
		formSet((prev) => ({ ...prev, [field]: value }));
	};

	const reformSet = () => {
		formSet(defaultFormValues);
		shootingEntriesSet([defaultWeaponEntry]);
	};

	const cancelEdit = () => {
		searchParamsSet({ edit: undefined });
		editFormSet();
		reformSet();
		closeModal();
	};

	const handleDelete = async () => {
		try {
			await activitiesWeaponsApi.deleteByActivity(editForm()!.id);
			await activitiesApi.delete(editForm()!.id);

			const editId = editForm()!.id;
			activitiesSet((prev) => prev.filter((item) => item.id !== editId));

			showToast({
				description: `${t("activity")} ${t("deleted")}`,
				variant: "success",
				duration: 3000,
			});

			if (props.modal && props.modalControl) {
				props.modalControl(false);
			}
		} catch (err) {
			errorMessageSet(err instanceof Error ? err.message : t("unknownError"));
		}
	};

	const handleSubmit = async (event: Event) => {
		event.preventDefault();
		errorMessageSet(null);
		loadingSet(true);

		try {
			const current = form();

			if (!current.date) {
				throw Error(t("component.activity.form.submit.required"));
			}

			const activityData: ActivityCreateInput = {
				club: current.club,
				date: new Date(current.date).toLocaleString(),
				exercises: current.exercises,
				location: current.location,
				notes: current.notes,
				owner: user().id,
				rangeMaster: current.rangeMaster,
			};

			// Only save entries where a weapon has actually been selected
			const validEntries = shootingEntries().filter((item) => item.weapon !== "");

			if (editForm()) {
				// Update activity
				const updatedItem = await activitiesApi.update(editForm()!.id, activityData);

				// Delete all existing junction records and recreate — avoids diff logic
				await activitiesWeaponsApi.deleteByActivity(editForm()!.id);

				for (const entry of validEntries) {
					await activitiesWeaponsApi.create({
						activity: editForm()!.id,
						caliber: entry.caliber,
						rounds: entry.rounds,
						weapon: entry.weapon,
					});
				}

				const editId = editForm()!.id;

				activitiesSet((prev) =>
					prev.map((item) => (item.id === editId ? updatedItem : item)),
				);

				showToast({
					description: `${t("activity")} ${t("saved")}`,
					variant: "success",
					duration: 3000,
				});
			} else {
				// Create activity then junction records
				const newItem = await activitiesApi.create(activityData);

				for (const entry of validEntries) {
					await activitiesWeaponsApi.create({
						activity: newItem.id,
						caliber: entry.caliber,
						rounds: entry.rounds,
						weapon: entry.weapon,
					});
				}

				activitiesSet((prev) => [...prev, newItem]);

				showToast({
					description: `${t("activity")} ${t("logged")}`,
					variant: "success",
					duration: 3000,
				});

				reformSet();
			}

			closeModal();
		} catch (err) {
			errorMessageSet(err instanceof Error ? err.message : t("unknownError"));
		}

		loadingSet(false);
	};

	const allCombinationsTaken = () => {
		return storeWeapons().every((weapon) => {
			const calibers = getCalibersForWeapon(weapon.id);

			if (calibers.length > 1) {
				const takenCalibers = shootingEntries()
					.filter((item) => item.weapon === weapon.id)
					.map((item) => item.caliber);
				return calibers.every((caliber) => takenCalibers.includes(caliber));
			}

			return shootingEntries().some((item) => item.weapon === weapon.id);
		});
	};

	createEffect(() => {
		if (props.edit) editFormSet(props.edit);
	});

	createEffect(() => {
		titleSet(editForm() ? `${t("edit")} ${t("activity")}` : `${t("save")} ${t("activity")}`);
	});

	createEffect(() => {
		if (editForm()) {
			formSet({
				club: editForm()!.club ?? "",
				date: dateTimeLocale({
					dateTime: editForm()!.date,
					withTime: true,
				}),
				exercises: editForm()!.exercises || "",
				location: editForm()!.location,
				notes: editForm()!.notes || "",
				owner: user().id,
				rangeMaster: editForm()!.rangeMaster,
			});
		}
	});

	// Fetch existing activity_weapons when editing
	createEffect(() => {
		const activity = editForm();
		if (!activity) {
			return;
		};

		activitiesWeaponsApi.read({
			filter: `activity = "${activity.id}"`,
		}).then((response) => {
			const activitiesWeapon = response as ReadListResponse<ActivityWeapon>;
			if (activitiesWeapon.items.length === 0) {
				shootingEntriesSet([defaultWeaponEntry]);
				return;
			}

			shootingEntriesSet(
				activitiesWeapon.items.map((entry) => ({
					existingId: entry.id,
					weapon: entry.weapon,
					caliber: entry.caliber,
					rounds: entry.rounds ?? 0,
				})),
			);
		}).catch((error) => {
			console.error(error);
			shootingEntriesSet([defaultWeaponEntry]);
		});
	});

	const FormFields = () => (
		<form onSubmit={handleSubmit} class="space-y-6">
			<Show when={errorMessage()}>
				<Alert variant="destructive">
					<AlertDescription>{errorMessage()}</AlertDescription>
				</Alert>
			</Show>

			<TextFieldInputGridItem
				key="date"
				onChange={handleInputChange}
				required
				title={t("date")}
				type="datetime-local"
				value={form().date}
			/>

			<SelectGridItem
				key="club"
				options={clubs.map((club) => club.name)}
				placeholder={`${t("select")} ${t("club")}`}
				title={t("club")}
				onChange={handleInputChange}
				value={form().club || ""}
			/>

			<TextFieldInputGridItem
				key="location"
				onChange={handleInputChange}
				title={t("location")}
				type="text"
				value={form().location || ""}
			/>

			<TextFieldInputGridItem
				key="rangeMaster"
				onChange={handleInputChange}
				title={t("rangeMaster")}
				type="text"
				value={form().rangeMaster || ""}
			/>

			<Separator />

			<div class="flex flex-col">
				<For each={shootingEntries()}>
					{(item, index) => {
						const availableCalibers = () => getCalibersForWeapon(item.weapon);
						const hasWeapon = () => item.weapon !== "";

						createEffect(() => {
							const calibers = availableCalibers();
							if (calibers.length === 0) return;

							const usedCalibers = shootingEntries()
								.filter((_, entryIndex) => entryIndex !== index())
								.filter((entry) => entry.weapon === item.weapon)
								.map((entry) => entry.caliber);

							const firstAvailable = calibers.find((c) => !usedCalibers.includes(c));

							if (firstAvailable && item.caliber === "") {
								handleShootingEntryChange(index(), "caliber", firstAvailable);
							}
						});

						return (
							<section class="grid grid-cols-12 gap-2 mb-2 text-sm">
								<Button
									class="mt-6 col-span-1"
									variant="destructive"
									size="sm"
									onClick={() => removeShootingEntry(index())}
									disabled={shootingEntries().length === 1 && item.weapon === ""}
								>
									-
								</Button>

								<div class="flex-1 flex flex-col gap-2 col-span-4">
									<Label class="text-muted-foreground font-light">
										{t("weapon")}
									</Label>
									<SelectNative
										onChange={(event) =>
											handleShootingEntryChange(index(), "weapon", event.target.value ?? "")}
										value={item.weapon}
									>
										<option disabled>
											{t("select")} {t("weapon")}
										</option>
										<For each={storeWeapons()}>
											{(weapon) => {
												const isDisabled = () => {
													const calibers = getCalibersForWeapon(weapon.id);
													if (calibers.length > 1) {
														const selectedCalibers = shootingEntries()
															.filter((_, entryIndex) => entryIndex !== index())
															.filter((entry) => entry.weapon === weapon.id)
															.map((entry) => entry.caliber);
														return calibers.every((caliber) => selectedCalibers.includes(caliber));
													} else {
														return shootingEntries()
															.filter((_, entryIndex) => entryIndex !== index())
															.some((entry) => entry.weapon === weapon.id);
													}
												};

												return (
													<option
														value={weapon.id}
														disabled={isDisabled()}
													>
														{weapon.name}
													</option>
												);
											}}
										</For>
									</SelectNative>
								</div>

								<Show when={hasWeapon()}>
									<div class="flex-1 flex flex-col gap-2 col-span-4">
										<Label class="text-muted-foreground font-light">
											{t("caliber")}
										</Label>
										<SelectNative
											onChange={(event) => {
												handleShootingEntryChange(index(), "caliber", "");

												handleShootingEntryChange(
													index(),
													"caliber",
													event.target.value ?? "",
												);
											}}
											value={item.caliber}
										>
											<option disabled>
												{t("select")} {t("caliber")}
											</option>
											<For each={availableCalibers()}>
												{(caliber) => (
													<option
														value={caliber}
														disabled={shootingEntries()
															.filter((_, i) => i !== index())
															.filter((entry) => entry.weapon === item.weapon)
															.some((entry) => entry.caliber === caliber)}
													>
														{caliber}
													</option>
												)}
											</For>
										</SelectNative>
									</div>

									<TextField
										class="col-span-3"
										onChange={(value) =>
											handleShootingEntryChange(
												index(),
												"rounds",
												parseInt(value) || 0,
											)}
									>
										<TextFieldLabel class="text-muted-foreground font-light mb-1">{t("shots")}</TextFieldLabel>
										<TextFieldInput value={item.rounds} type="number" min="0" />
									</TextField>
								</Show>
							</section>
						);
					}}
				</For>

				<Button
					class="justify-end text-muted-foreground"
					variant="link"
					size="sm"
					onClick={addShootingEntry}
					disabled={
						shootingEntries().some((item) => item.weapon === "") ||
						allCombinationsTaken()
					}
				>
					+ {t("add")}
				</Button>
			</div>

			<Separator />

			<TextFieldAreaGridItem
				key="exercises"
				onChange={handleInputChange}
				title={t("exercises")}
				value={form().exercises || ""}
			/>

			<TextFieldAreaGridItem
				key="notes"
				onChange={handleInputChange}
				title={t("notes")}
				value={form().notes || ""}
			/>

			<div class="flex justify-between pt-4">
				<div>
					<Show when={editForm()}>
						<Dialog>
							<DialogTrigger
								as={Button}
								type="button"
								variant="destructive"
							>
								{t("delete")}
							</DialogTrigger>
							<DialogContent class="max-w-sm">
								<DialogHeader>
									<DialogTitle>
										{t("component.activity.form.delete.title")}
									</DialogTitle>
								</DialogHeader>
								<DialogDescription>
									{t("component.activity.form.delete.description")}
								</DialogDescription>
								<DialogTrigger
									as={Button}
									variant="outline"
								>
									{t("cancel")}
								</DialogTrigger>
								<DialogTrigger
									as={Button}
									variant="destructive"
									onClick={handleDelete}
								>
									{t("continue")}
								</DialogTrigger>
							</DialogContent>
						</Dialog>
					</Show>
				</div>

				<div class="justify-end flex gap-4">
					<Show when={editForm()}>
						<Button
							variant="outline"
							onClick={cancelEdit}
						>
							{t("cancel")}
						</Button>
					</Show>
					<Button
						type="submit"
						disabled={loading()}
						variant="success"
					>
						<Show
							when={loading()}
							fallback={
								editForm()
									? t("update")
									: t("save")
							}
						>
							<Spinner
								size="sm"
								variant="white"
								class="mr-2"
							/>
							{t("saving")}
							...
						</Show>
					</Button>
				</div>
			</div>
		</form>
	);

	const FormContent = () => (
		<>
			<Show when={props.modal}>
				<DialogHeader>
					<DialogTitle>{title()}</DialogTitle>
				</DialogHeader>
				<FormFields />
			</Show>
			<Show when={!props.modal}>
				<CardHeader>
					<CardTitle>{title()}</CardTitle>
				</CardHeader>
				<CardContent>
					<FormFields />
				</CardContent>
			</Show>
		</>
	);

	return (
		<ConditionalWrapper
			condition={!props.modal}
			wrapper={(wrapperChildren) => <Card>{wrapperChildren}</Card>}
		>
			<FormContent />
		</ConditionalWrapper>
	);
};
