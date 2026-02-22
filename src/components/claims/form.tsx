import {
	Component,
	createSignal,
	Show,
	createEffect,
	Setter,
} from "solid-js";
import { isoDateTimeToDateInput, todayISODate } from "~/utilities";
import {
	ClaimCreateInput,
	ClaimCollectionItem,
} from "~/types";
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
	TextFieldInputGridItem,
	Spinner,
	TextFieldAreaGridItem,
	showToast,
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTrigger,
	Label,
	FileSource,
} from "~/components";
import { useSearchParams } from "@solidjs/router";
import {
	claims as claimsApi,
	file as fileApi,
} from "infrastructure";
import { federations, clubs, claims } from "~/data";
interface ManageActivityFormProps {
	modal?: boolean;
	modalControl?: Setter<boolean>;
	edit?: ClaimCollectionItem;
}

export const ClaimsForm: Component<ManageActivityFormProps> = (props) => {
	const {
		user,
		claimsSet,
	} = useStore();

	const [_, setSearchParams] = useSearchParams();

	const defaultFormValues = {
		club: undefined,
		date: todayISODate(true),
		federation: undefined,
		image: undefined,
		location: undefined,
		notes: undefined,
		owner: user().id,
		rangeMaster: undefined,
		type: "",
	};

	const [form, formSet] = createSignal<ClaimCreateInput>(defaultFormValues);
	const [editForm, editFormSet] = createSignal<ClaimCollectionItem>();
	const [loading, loadingSet] = createSignal(false);
	const [error, errorSet] = createSignal<string | null>(null);
	const [title, titleSet] = createSignal<string>();

	const closeModal = () => {
		if (props.modal && props.modalControl) {
			props.modalControl(false);
		}
	}

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

			claimsSet((prev) => prev.filter((item) => item.id !== editForm()!.id));

			showToast({
				description: "Fordringen raderades",
				variant: "success",
				duration: 3000,
			});

			if (props.modal && props.modalControl) {
				props.modalControl(false);
			}
		} catch (err) {
			errorSet(err instanceof Error ? err.message : "Något gick fel");
		}
	};

	const handleSubmit = async (event: Event) => {
		event.preventDefault();
		errorSet(null);
		loadingSet(true);

		try {
			const current = form();

			if (
				!current.date
				|| !current.type
			) {
				throw new Error("Ange datum och fordran.");
			}

			const claimData: ClaimCreateInput = {
				club: current.club,
				date: isoDateTimeToDateInput(current.date, true, true),
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

				claimsSet((prev) =>
					prev.map((item) => (item.id === editForm()!.id ? updatedItem : item))
				);

				showToast({
					description: "Aktiviteten uppdaterades",
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
					description: "Fordringen sparades",
					variant: "success",
					duration: 3000,
				});

				formReset();
			}

			closeModal();
		} catch (err) {
			errorSet(err instanceof Error ? err.message : "Något gick fel");
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
					title="Datum"
					type="datetime-local"
					value={form().date}
				/>

				<SelectGridItem
					key="club"
					options={clubs.map((club) => club.name)}
					placeholder="Välj klubb"
					title="Klubb"
					onChange={handleInputChange}
					value={form().club || ""}
				/>

				<TextFieldInputGridItem
					key="location"
					onChange={handleInputChange}
					title="Plats"
					type="text"
					value={form().location || ""}
				/>

				<TextFieldInputGridItem
					key="rangeMaster"
					onChange={handleInputChange}
					title="Skjutledare"
					type="text"
					value={form().rangeMaster || ""}
				/>

				<SelectGridItem
					key={"type"}
					options={claims}
					placeholder="Välj typ"
					title="Fordran"
					required
					onChange={handleInputChange}
					value={form().type}
				/>

				<SelectGridItem
					key={"federation"}
					options={federations}
					placeholder="Välj förbund"
					title="Förbund"
					required
					onChange={handleInputChange}
					value={form().federation || ""}
				/>

				<TextFieldAreaGridItem
					key="notes"
					onChange={handleInputChange}
					title="Egna Anteckningar"
					value={form().notes || ""}
				/>
			</div>

			<div class="space-y-6">
				<Label>
					Bild
				</Label>
				<input
					ref={imageInputRef}
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
						Välj bild
					</Button>

					<Show when={pendingImage() || existingImage()}>
						<Button
							onClick={() => {
								if (pendingImage()) {
									pendingImageSet(null)
								}
								if (existingImage()) {
									existingImageSet()
								}
							}}
							size="sm"
							variant="destructive"
						>
							Ta bort
						</Button>
					</Show>
				</div>

				<div class="w-full">
					<Show when={existingImage()} keyed>
						{
							(image) =>
								<FileSource
									id={image}
									size="1280x0"
									image
								/>
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
								Radera
							</DialogTrigger>
							<DialogContent class="max-w-sm">
								<DialogHeader>
									<DialogTitle>
										Är du säker på att du vill radera fordringen?
									</DialogTitle>
								</DialogHeader>
								<DialogDescription>
									Detta kommer att ta bort fordringen permanent. Denna åtgärd kan inte ångras.
								</DialogDescription>
								<DialogTrigger
									as={Button}
									variant="outline"
								>
									Avbryt
								</DialogTrigger>
								<DialogTrigger
									as={Button}
									variant="destructive"
									onClick={handleDelete}
								>
									Fortsätt
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
							Avbryt
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
									? "Uppdatera"
									: "Spara"
							}
						>
							<Spinner
								size="sm"
								variant="white"
								class="mr-2"
							/>
							Sparar...
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
		titleSet(editForm() ? "Redigera fordring" : "Spara fordring");
	});

	createEffect(() => {
		if (editForm()) {
			existingImageSet(editForm()!.image);

			formSet({
				club: editForm()!.club ?? "",
				date: isoDateTimeToDateInput(editForm()!.date, true, true),
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
			condition={!Boolean(props.modal)}
			wrapper={(wrapperChildren) => <Card>{wrapperChildren}</Card>}
		>
			<FormContent />
		</ConditionalWrapper>
	);
};
