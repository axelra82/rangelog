import {
	Component,
	createSignal,
	Show,
	onMount,
	For,
	createEffect,
} from "solid-js";
import { clubs } from "~/data/clubs";
import {
	activities,
	activitiesWeapons,
} from "infrastructure/services";
import { isoDateTimeToDateInput, todayISODate } from "~/utilities";
import { ActivityCreateInput, ActivityCollectionItem, ShootingEntry } from "~/types";
import { useStore } from "~/store";
import {
	Alert,
	AlertDescription,
	Button,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	ConditionalWrapper,
	DialogHeader,
	DialogTitle,
	SelectGridItem,
	TextFieldGridItem,
	Spinner,
} from "~/components";

interface ManageActivityFormProps {
	modal?: boolean;
	editActivity?: ActivityCollectionItem;
	onSuccess?: () => void;
}

type FormData = {
	date: string;
	owner: string;
	rangeMaster: string;
	exercises: string;
	notes: string;
	location: string;
	club: string;
};

export const ManageActivityForm: Component<ManageActivityFormProps> = (props) => {
	const {
		user,
		activitiesSet,
		weapons: storeWeapons,
	} = useStore();

	const defaultFormValues: FormData = {
		date: todayISODate(true),
		owner: user().id,
		rangeMaster: "",
		exercises: "",
		notes: "",
		location: "",
		club: "",
	};

	const [form, formSet] = createSignal<FormData>(defaultFormValues);
	const [shootingEntries, shootingEntriesSet] = createSignal<ShootingEntry[]>([
		{ weapon: "", caliber: "", rounds: 0 },
	]);

	const [loading, loadingSet] = createSignal(false);
	const [error, errorSet] = createSignal<string | null>(null);
	const [success, successSet] = createSignal(false);
	const [title, titleSet] = createSignal<string>();
	const [eventNote, eventNoteSet] = createSignal<string>();

	// Populate form when editing
	createEffect(() => {
		if (props.editActivity) {
			formSet({
				date: props.editActivity.date
					? isoDateTimeToDateInput(props.editActivity.date)
					: todayISODate(true),
				owner: props.editActivity.owner,
				rangeMaster: props.editActivity.rangeMaster,
				exercises: props.editActivity.exercises || "",
				notes: props.editActivity.notes || "",
				location: props.editActivity.location || "",
				club: props.editActivity.club || "",
			});
		}
	});

	onMount(() => {
		if (props.editActivity) {
			titleSet("Redigera skjutaktivitet");
			eventNoteSet("Aktivitet uppdaterad");
		} else {
			titleSet("Lägg till ny skjutaktivitet");
			eventNoteSet("Aktivitet tillagd");
		}
	});

	const handleInputChange = (
		field: string,
		value: string | string[],
	) => {
		formSet((prev) => ({
			...prev,
			[field]: value,
		}));
	};

	const handleShootingEntryChange = (
		index: number,
		field: keyof ShootingEntry,
		value: any
	) => {
		shootingEntriesSet((prev) => {
			const updated = [...prev];

			// If weapon changed, auto-populate caliber
			if (field === "weapon" && value) {
				const selectedWeapon = storeWeapons().find(w => w.id === value);
				if (selectedWeapon) {
					updated[index] = {
						...updated[index],
						weapon: value,
						caliber: selectedWeapon.caliber,
					};
					return updated;
				}
			}

			updated[index] = { ...updated[index], [field]: value };
			return updated;
		});
	};

	const addShootingEntry = () => {
		shootingEntriesSet((prev) => [...prev, { weapon: "", caliber: "", rounds: 0 }]);
	};

	const removeShootingEntry = (index: number) => {
		shootingEntriesSet((prev) => prev.filter((_, i) => i !== index));
	};

	const reformSet = () => {
		formSet(defaultFormValues);
		shootingEntriesSet([{ weapon: "", caliber: "", rounds: 0 }]);
	};

	const handleSubmit = async (event: Event) => {
		event.preventDefault();
		errorSet(null);
		successSet(false);
		loadingSet(true);

		try {
			const current = form();

			if (!current.date || !current.rangeMaster) {
				throw new Error("Fyll i datum och skjutledare.");
			}

			const activityData: ActivityCreateInput = {
				date: isoDateTimeToDateInput(current.date, true),
				owner: current.owner,
				rangeMaster: current.rangeMaster,
				exercises: current.exercises || undefined,
				notes: current.notes || undefined,
				location: current.location || undefined,
				club: current.club || undefined,
			};

			let activityId: string;

			if (props.editActivity) {
				const updatedItem = await activities.update(props.editActivity.id, activityData);
				activityId = updatedItem.id;

				// Delete existing activity_weapons entries
				await activitiesWeapons.deleteByActivity(props.editActivity.id);

				activitiesSet((prev) =>
					prev.map((a) => (a.id === props.editActivity!.id ? updatedItem : a))
				);
			} else {
				const newItem = await activities.create(activityData);
				activityId = newItem.id;
				activitiesSet((prev) => [...prev, newItem]);
			}

			// Create activity_weapons entries
			for (const entry of shootingEntries()) {
				if (entry.weapon) {
					await activitiesWeapons.create({
						activity: activityId,
						weapon: entry.weapon,
						rounds: entry.rounds,
						caliber: entry.caliber,
					});
				}
			}

			reformSet();
			successSet(true);

			if (props.onSuccess) {
				setTimeout(() => {
					props.onSuccess!();
				}, 1000);
			}
		} catch (err: any) {
			errorSet(err?.message ?? "Något gick fel");
		} finally {
			loadingSet(false);
		}
	};

	const FormContent = () => (
		<>
			<Show when={props.modal}>
				<DialogHeader>
					<DialogTitle>
						{title()}
					</DialogTitle>
				</DialogHeader>
				<div class="px-6 pb-6">
					<FormFields />
				</div>
			</Show>

			<Show when={!props.modal}>
				<CardHeader>
					<CardTitle>
						{title()}
					</CardTitle>
				</CardHeader>
				<CardContent>
					<FormFields />
				</CardContent>
			</Show>
		</>
	);

	const FormFields = () => (
		<form onSubmit={handleSubmit} class="space-y-6">
			<Show when={error()}>
				<Alert variant="destructive">
					<AlertDescription>{error()}</AlertDescription>
				</Alert>
			</Show>

			<Show when={success()}>
				<Alert>
					<AlertDescription>
						{eventNote()}
					</AlertDescription>
				</Alert>
			</Show>

			{/* Label-Input Grid Layout */}
			<TextFieldGridItem
				key={"date"}
				onChange={handleInputChange}
				required
				title="Datum"
				type="date"
				value={form().date}
			/>

			<SelectGridItem
				key={"club"}
				options={clubs.map(club => club.name)}
				placeholder="Välj klubb"
				title="Klubb"
				onChange={handleInputChange}
				value={form().club}
			/>

			<TextFieldGridItem
				key={"location"}
				onChange={handleInputChange}
				title="Plats"
				type="text"
				value={form().location}
			/>

			<TextFieldGridItem
				key={"rangeMaster"}
				onChange={handleInputChange}
				required
				title="Skjutledare"
				type="text"
				value={form().rangeMaster}
			/>

			{/* Shooting Entries Section */}
			<div class="space-y-4">
				<div class="text-sm font-medium">Skytte</div>
				<For each={shootingEntries()}>
					{(entry, index) => (
						<div class="grid grid-cols-[2fr_1fr_1fr_auto] gap-4 items-start">
							<SelectGridItem
								key={`weapon-${index()}`}
								options={storeWeapons().map(weapon => weapon.name)}
								placeholder="Välj vapen"
								title={index() === 0 ? "Vapen" : ""}
								onChange={(field, value) => handleShootingEntryChange(index(), "weapon", value)}
								value={entry.weapon}
								required
							/>

							<TextFieldGridItem
								key={`caliber-${index()}`}
								title={index() === 0 ? "Kaliber" : ""}
								type="text"
								value={entry.caliber}
								onChange={() => { }}
							/>

							<TextFieldGridItem
								key={`rounds-${index()}`}
								title={index() === 0 ? "Ant.skott" : ""}
								type="text"
								value={entry.rounds.toString()}
								onChange={(value) => handleShootingEntryChange(index(), "rounds", parseInt(value as string) || 0)}
								required
							/>

							<div class={index() === 0 ? "pt-6" : ""}>
								<Button
									type="button"
									variant="destructive"
									size="sm"
									onClick={() => removeShootingEntry(index())}
									disabled={shootingEntries().length === 1}
								>
									-
								</Button>
							</div>
						</div>
					)}
				</For>

				<Button
					type="button"
					variant="outline"
					size="sm"
					onClick={addShootingEntry}
				>
					+ Lägg till vapen
				</Button>
			</div>

			<TextFieldGridItem
				key={"exercises"}
				onChange={handleInputChange}
				title="Övningar"
				type="textarea"
				value={form().exercises}
			/>

			<TextFieldGridItem
				key={"notes"}
				onChange={handleInputChange}
				title="Egna Anteckningar"
				type="textarea"
				value={form().notes}
			/>

			<div class="flex justify-end pt-4">
				<Button
					type="submit"
					disabled={loading()}
					variant="success"
				>
					<Show when={loading()} fallback={props.editActivity ? "Uppdatera" : "Spara"}>
						<Spinner size="sm" variant="white" class="mr-2" />
						Sparar...
					</Show>
				</Button>
			</div>
		</form>
	);

	return (
		<ConditionalWrapper
			condition={!Boolean(props.modal)}
			wrapper={(wrapperChildren) => (
				<Card>
					{wrapperChildren}
				</Card>
			)}
		>
			<FormContent />
		</ConditionalWrapper>
	);
};

// import { Component, createSignal, createEffect, For } from "solid-js";
// import {
// 	TextField,
// 	Button,
// 	MenuItem,
// 	Stack,
// 	Alert,
// 	Typography,
// 	CircularProgress,
// 	Paper,
// 	FormControl,
// 	InputLabel,
// 	Select,
// 	IconButton,
// 	Box,
// } from "@suid/material";
// import AddIcon from "@suid/icons-material/Add";
// import RemoveIcon from "@suid/icons-material/Remove";

// import { clubs } from "~/data/clubs"; // You'll need to create this
// import {
// 	activities,
// 	activitiesWeapons,
// } from "infrastructure/services";
// import { isoDateTimeToDateInput, todayISODate } from "~/utilities";
// import { ActivityCreateInput, ActivityCollectionItem, ShootingEntry } from "~/types";
// import { useStore } from "~/store";
// import { ConditionalWrapper } from "~/components/conditional-wrapper";

// interface ManageActivityFormProps {
// 	modal?: boolean;
// 	editActivity?: ActivityCollectionItem;
// 	onSuccess?: () => void;
// }

// export const ManageActivityForm: Component<ManageActivityFormProps> = (props) => {
// 	const {
// 		user,
// 		activitiesSet,
// 		weapons: storeWeapons,
// 	} = useStore();

// 	const defaultFormValues: ActivityCreateInput = {
// 		date: todayISODate(true),
// 		owner: user().id,
// 		rangeMaster: "",
// 		exercises: "",
// 		notes: "",
// 		location: "",
// 		club: "",
// 	};

// 	const [form, setForm] = createSignal<ActivityCreateInput>(defaultFormValues);
// 	const [shootingEntries, setShootingEntries] = createSignal<ShootingEntry[]>([
// 		{ weapon: "", caliber: "", rounds: 0 },
// 	]);

// 	const [loading, setLoading] = createSignal(false);
// 	const [error, setError] = createSignal<string | null>(null);
// 	const [success, setSuccess] = createSignal(false);

// 	// Populate form when editing
// 	createEffect(() => {
// 		if (props.editActivity) {
// 			setForm({
// 				date: props.editActivity.date
// 					? isoDateTimeToDateInput(props.editActivity.date)
// 					: todayISODate(true),
// 				owner: props.editActivity.owner,
// 				rangeMaster: props.editActivity.rangeMaster,
// 				exercises: props.editActivity.exercises || "",
// 				notes: props.editActivity.notes || "",
// 				location: props.editActivity.location || "",
// 				club: props.editActivity.club || "",
// 			});
// 		}
// 	});

// 	const handleChange =
// 		<K extends keyof ActivityCreateInput>(field: K) =>
// 			(e: any) => {
// 				setForm((prev) => ({
// 					...prev,
// 					[field]: e.target.value as ActivityCreateInput[K],
// 				}));
// 			};

// 	const handleShootingEntryChange = (index: number, field: keyof ShootingEntry, value: any) => {
// 		setShootingEntries((prev) => {
// 			const updated = [...prev];

// 			// If weapon changed, auto-populate caliber
// 			if (field === "weapon" && value) {
// 				const selectedWeapon = storeWeapons().find(w => w.id === value);
// 				if (selectedWeapon) {
// 					updated[index] = {
// 						...updated[index],
// 						weapon: value,
// 						caliber: selectedWeapon.caliber, // Auto-populate caliber
// 					};
// 					return updated;
// 				}
// 			}

// 			updated[index] = { ...updated[index], [field]: value };
// 			return updated;
// 		});
// 	};

// 	const addShootingEntry = () => {
// 		setShootingEntries((prev) => [...prev, { weapon: "", caliber: "", rounds: 0 }]);
// 	};

// 	const removeShootingEntry = (index: number) => {
// 		setShootingEntries((prev) => prev.filter((_, i) => i !== index));
// 	};

// 	const resetForm = () => {
// 		setForm(defaultFormValues);
// 		setShootingEntries([{ weapon: "", caliber: "", rounds: 0 }]);
// 	};

// 	const handleSubmit = async (event: Event) => {
// 		event.preventDefault();
// 		setError(null);
// 		setSuccess(false);
// 		setLoading(true);

// 		try {
// 			const current = form();

// 			if (!current.date || !current.rangeMaster) {
// 				throw new Error("Fyll i datum och skjutledare.");
// 			}

// 			const activityData = {
// 				date: isoDateTimeToDateInput(current.date, true),
// 				owner: current.owner,
// 				rangeMaster: current.rangeMaster,
// 				exercises: current.exercises || undefined,
// 				notes: current.notes || undefined,
// 				location: current.location || undefined,
// 				club: current.club || undefined,
// 			};

// 			let activityId: string;

// 			if (props.editActivity) {
// 				const updatedItem = await activities.update(props.editActivity.id, activityData);
// 				activityId = updatedItem.id;

// 				// Delete existing activity_weapons entries
// 				await activitiesWeapons.deleteByActivity(props.editActivity.id);

// 				activitiesSet((prev) =>
// 					prev.map((a) => (a.id === props.editActivity!.id ? updatedItem : a))
// 				);
// 			} else {
// 				const newItem = await activities.create(activityData);
// 				activityId = newItem.id;
// 				activitiesSet((prev) => [...prev, newItem]);
// 			}

// 			// Create activity_weapons entries
// 			for (const entry of shootingEntries()) {
// 				if (entry.weapon) {
// 					await activitiesWeapons.create({
// 						activity: activityId,
// 						weapon: entry.weapon,
// 						rounds: entry.rounds,
// 						caliber: entry.caliber,
// 					});
// 				}
// 			}

// 			resetForm();
// 			setSuccess(true);

// 			if (props.onSuccess) {
// 				setTimeout(() => {
// 					props.onSuccess!();
// 				}, 1000);
// 			}
// 		} catch (err: any) {
// 			setError(err?.message ?? "Något gick fel");
// 		} finally {
// 			setLoading(false);
// 		}
// 	};

// 	return (
// 		<ConditionalWrapper
// 			condition={!Boolean(props.modal)}
// 			wrapper={(wrapperChildren) => <Paper sx={{ p: 4 }}>{wrapperChildren}</Paper>}
// 		>
// 			<>
// 				<Typography variant="h5" gutterBottom>
// 					{props.editActivity ? "Redigera skjutaktivitet" : "Lägg till ny skjutaktivitet"}
// 				</Typography>

// 				<form onSubmit={handleSubmit}>
// 					<Stack spacing={3}>
// 						{error() && <Alert severity="error">{error()}</Alert>}
// 						{success() && (
// 							<Alert severity="success">
// 								{props.editActivity ? "Aktivitet uppdaterad" : "Aktivitet tillagd"}
// 							</Alert>
// 						)}

// 						<TextField
// 							label="Datum"
// 							type="datetime-local"
// 							value={form().date}
// 							onChange={handleChange("date")}
// 							InputLabelProps={{ shrink: true }}
// 							required
// 							fullWidth
// 						/>

// 						<FormControl fullWidth>
// 							<InputLabel id="club-label">Klubb</InputLabel>
// 							<Select
// 								labelId="club-label"
// 								value={form().club ?? ""}
// 								label="Klubb"
// 								onChange={handleChange("club")}
// 							>
// 								<MenuItem value="">Välj klubb</MenuItem>
// 								{clubs.map((club) => (
// 									<MenuItem value={club.name}>{club.name}</MenuItem>
// 								))}
// 							</Select>
// 						</FormControl>

// 						<TextField
// 							label="Plats"
// 							value={form().location}
// 							onChange={handleChange("location")}
// 							fullWidth
// 						/>

// 						<TextField
// 							label="Skjutledare"
// 							value={form().rangeMaster}
// 							onChange={handleChange("rangeMaster")}
// 							required
// 							fullWidth
// 						/>

// 						{/* Shooting Entries Section */}
// 						<Box>
// 							<Typography variant="subtitle1" gutterBottom>
// 								Skytte
// 							</Typography>
// 							<Stack spacing={2}>
// 								<For each={shootingEntries()}>
// 									{(entry, index) => (
// 										<Stack direction="row" spacing={2} alignItems="center">
// 											<FormControl sx={{ flex: 2 }} required>
// 												<InputLabel>Vapen</InputLabel>
// 												<Select
// 													value={entry.weapon}
// 													label="Vapen"
// 													onChange={(e) =>
// 														handleShootingEntryChange(index(), "weapon", e.target.value)
// 													}
// 												>
// 													<MenuItem value="">Välj vapen</MenuItem>
// 													<For each={storeWeapons()}>
// 														{(weapon) => (
// 															<MenuItem value={weapon.id}>
// 																{weapon.name} ({weapon.caliber})
// 															</MenuItem>
// 														)}
// 													</For>
// 												</Select>
// 											</FormControl>

// 											<TextField
// 												label="Kaliber"
// 												value={entry.caliber}
// 												disabled
// 												sx={{ flex: 1 }}
// 												InputProps={{
// 													readOnly: true,
// 												}}
// 											/>

// 											<TextField
// 												label="Ant.skott"
// 												type="number"
// 												value={entry.rounds}
// 												onChange={(e) =>
// 													handleShootingEntryChange(index(), "rounds", parseInt(e.target.value) || 0)
// 												}
// 												required
// 												sx={{ flex: 1 }}
// 											/>

// 											<IconButton
// 												color="error"
// 												onClick={() => removeShootingEntry(index())}
// 												disabled={shootingEntries().length === 1}
// 											>
// 												<RemoveIcon />
// 											</IconButton>
// 										</Stack>
// 									)}
// 								</For>

// 								<Button
// 									variant="text"
// 									startIcon={<AddIcon />}
// 									onClick={addShootingEntry}
// 									sx={{ alignSelf: "flex-start" }}
// 								>
// 									LÄGG TILL VAPEN
// 								</Button>
// 							</Stack>
// 						</Box>

// 						<TextField
// 							label="Övningar"
// 							value={form().exercises}
// 							onChange={handleChange("exercises")}
// 							multiline
// 							rows={4}
// 							fullWidth
// 						/>

// 						<TextField
// 							label="Egna Anteckningar"
// 							value={form().notes}
// 							onChange={handleChange("notes")}
// 							multiline
// 							rows={4}
// 							fullWidth
// 						/>

// 						<Stack direction="row" spacing={2} justifyContent="flex-end">
// 							<Button variant="outlined" onClick={resetForm} disabled={loading()}>
// 								AVBRYT
// 							</Button>
// 							<Button
// 								type="submit"
// 								variant="contained"
// 								disabled={loading()}
// 								sx={{
// 									bgcolor: "success.main",
// 									"&:hover": { bgcolor: "success.dark" },
// 								}}
// 							>
// 								{loading() ? (
// 									<CircularProgress size={24} />
// 								) : props.editActivity ? (
// 									"UPPDATERA"
// 								) : (
// 									"SPARA"
// 								)}
// 							</Button>
// 						</Stack>
// 					</Stack>
// 				</form>
// 			</>
// 		</ConditionalWrapper>
// 	);
// };
