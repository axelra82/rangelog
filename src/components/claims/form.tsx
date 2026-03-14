import { useSearchParams } from "@solidjs/router";
import {
	claims as claimsApi,
	file as fileApi,
} from "infrastructure";
import {
	Component,
	createEffect,
	createSignal,
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
	FileSource,
	Label,
	SelectGridItem,
	showToast,
	Spinner,
	TextFieldAreaGridItem,
	TextFieldInputGridItem,
} from "~/components";
import { claims, clubs, federations } from "~/data";
import {
	Claim,
	ClaimCreateInput,
} from "~/schemas";
import { useStore } from "~/store";
import {
	dateTimeLocale,
	dateTimeLocaleToday,
	t,
} from "~/utilities";

interface ManageActivityFormProps {
	modal?: boolean;
	modalControl?: Setter<boolean>;
	edit?: Claim;
}

export const ClaimsForm: Component<ManageActivityFormProps> = (props) => {
	const {
		user,
		claimsSet,
	} = useStore();

	const [_, setSearchParams] = useSearchParams();

	const defaultFormValues = {
		club: undefined,
		date: dateTimeLocaleToday(),
		federation: "",
		image: undefined,
		location: undefined,
		notes: undefined,
		owner: user().id,
		rangeMaster: undefined,
		type: "",
	};

	const [form, formSet] = createSignal<ClaimCreateInput>(defaultFormValues);
	const [editForm, editFormSet] = createSignal<Claim>();
	const [loading, loadingSet] = createSignal(false);
	const [error, errorSet] = createSignal<string | null>(null);
	const [title, titleSet] = createSignal<string>();

	const closeModal = () => {
		if (props.modal && props.modalControl) {
			props.modalControl(false);
		}
	};

	const [existingImage, existingImageSet] = createSignal<string>();
	const [pendingImage, pendingImageSet] = createSignal<File | null>(null);
	const handleImageChange = (event: Event) => {
		const input = event.target as HTMLInputElement;
		pendingImageSet(() => input.files?.[0] ?? null);
	};

	let imageInputRef: HTMLInputElement | undefined;

	const handleInputChange = (field: string, value: string | string[]) => {
		formSet((prev) => ({ ...prev, [field]: value }));
	};

	const formReset = () => {
		formSet(defaultFormValues);
		existingImageSet();
		pendingImageSet(null);
	};

	const cancelEdit = () => {
		setSearchParams({ edit: undefined });
		editFormSet();
		formReset();
		closeModal();
	};

	const handleDelete = async () => {
		try {
			await claimsApi.delete(editForm()!.id);

			const editId = editForm()!.id;

			claimsSet((prev) => prev.filter((item) => item.id !== editId));

			showToast({
				description: `${t("claim")} ${t("deleted")}`,
				variant: "success",
				duration: 3000,
			});

			if (props.modal && props.modalControl) {
				props.modalControl(false);
			}
		} catch (err) {
			errorSet(err instanceof Error ? err.message : t("unknownError"));
		}
	};

	const handleSubmit = async (event: Event) => {
		event.preventDefault();
		errorSet(null);
		loadingSet(true);

		try {
			const current = form();

			if (
				!current.date ||
				!current.type ||
				!current.federation
			) {
				throw Error(t("component.claim.form.submit.required"));
			}

			const claimData: ClaimCreateInput = {
				club: current.club,
				date: dateTimeLocale({
					dateTime: current.date,
				}),
				federation: current.federation,
				image: current.image,
				location: current.location,
				notes: current.notes,
				owner: user().id,
				rangeMaster: current.rangeMaster,
				type: current.type,
			};

			// Handle image
			let imageId: string | undefined = current.image;

			if (editForm() && !existingImage() && current.image) {
				// Image was removed — delete the old file record
				await fileApi.delete(current.image);
				imageId = undefined;
			}

			const pending = pendingImage();
			if (pending) {
				const imageRecord = await fileApi.create({
					owner: current.owner,
					name: pending.name,
					source: pending,
					size: pending.size,
					type: pending.type,
				});
				imageId = imageRecord.id;
				pendingImageSet(null);
			}

			if (editForm()) {
				const updatedItem = await claimsApi.update(
					editForm()!.id,
					{
						...claimData,
						image: imageId,
					},
				);

				const editId = editForm()!.id;

				claimsSet((prev) =>
					prev.map((item) => (item.id === editId ? updatedItem : item)),
				);

				showToast({
					description: `${t("activity")} ${t("saved")}`,
					variant: "success",
					duration: 3000,
				});
			} else {
				// Create activity then junction records
				const newItem = await claimsApi.create({
					...claimData,
					image: imageId,
				});

				claimsSet((prev) => [...prev, newItem]);

				showToast({
					description: `${t("claim")} ${t("saved")}`,
					variant: "success",
					duration: 3000,
				});

				formReset();
			}

			closeModal();
		} catch (err) {
			errorSet(err instanceof Error ? err.message : t("unknownError"));
		}

		loadingSet(false);
	};

	const FormFields = () => (
		<form onSubmit={handleSubmit} class="space-y-6">
			<Show when={error()}>
				<Alert variant="destructive">
					<AlertDescription>{error()}</AlertDescription>
				</Alert>
			</Show>

			<div class="space-y-6">
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

				<SelectGridItem
					key="type"
					options={claims}
					placeholder="Välj typ"
					title={t("claim")}
					required
					onChange={handleInputChange}
					value={form().type}
				/>

				<SelectGridItem
					key="federation"
					options={federations}
					placeholder={`${t("select")} ${t("federation")}`}
					title={t("federation")}
					required
					onChange={handleInputChange}
					value={form().federation || ""}
				/>

				<TextFieldAreaGridItem
					key="notes"
					onChange={handleInputChange}
					title={t("notes")}
					value={form().notes || ""}
				/>
			</div>

			<div class="space-y-6">
				<Label>
					{t("image")}
				</Label>
				<input
					ref={(element) => (imageInputRef = element)}
					type="file"
					multiple
					class="hidden"
					onChange={handleImageChange}
					accept="image/png,image/jpeg,image/jpg"
				/>

				<div class="flex gap-4 mt-2">
					<Button
						onClick={() => imageInputRef?.click()}
						size="sm"
						variant="outline"
					>
						{t("select")} {t("image")}
					</Button>

					<Show when={pendingImage() || existingImage()}>
						<Button
							onClick={() => {
								if (pendingImage()) {
									pendingImageSet(null);
								}
								if (existingImage()) {
									existingImageSet();
								}
							}}
							size="sm"
							variant="destructive"
						>
							{t("remove")}
						</Button>
					</Show>
				</div>

				<div class="w-full">
					<Show when={existingImage()} keyed>
						{
							(image) => (
								<FileSource
									id={image}
									size="1280x0"
									image
								/>
							)
						}
					</Show>
				</div>

				<Show when={pendingImage()} keyed>
					{(image) => <img src={URL.createObjectURL(image)} />}
				</Show>
			</div>

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
										{t("component.claim.form.delete.title")}
									</DialogTitle>
								</DialogHeader>
								<DialogDescription>
									{t("component.claim.form.delete.description")}
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

	createEffect(() => {
		if (props.edit) editFormSet(props.edit);
	});

	createEffect(() => {
		titleSet(editForm() ? `${t("edit")} ${t("claim")}` : `${t("save")} ${t("claim")}`);
	});

	createEffect(() => {
		if (editForm()) {
			existingImageSet(editForm()!.image);

			formSet({
				club: editForm()!.club ?? "",
				date: dateTimeLocale({
					dateTime: editForm()!.date,
					withTime: true,
				}),
				federation: editForm()!.federation,
				image: editForm()!.image,
				location: editForm()!.location,
				notes: editForm()!.notes || "",
				owner: user().id,
				rangeMaster: editForm()!.rangeMaster,
				type: editForm()!.type,
			});
		}
	});

	return (
		<ConditionalWrapper
			condition={!props.modal}
			wrapper={(wrapperChildren) => <Card>{wrapperChildren}</Card>}
		>
			<FormContent />
		</ConditionalWrapper>
	);
};
