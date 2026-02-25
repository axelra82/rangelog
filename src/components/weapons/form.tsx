import {
	Component,
	createEffect,
	createSignal,
	For,
	Setter,
	Show,
} from "solid-js";
import {
	calibers,
	federations,
	weaponTypes,
} from "~/data";
import {
	file as fileApi,
	weapons as weaponsApi,
} from "infrastructure";
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
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	FileSource,
	Label,
	SelectGridItem,
	Separator,
	showToast,
	Spinner,
	TextFieldAreaGridItem,
	TextFieldInputGridItem,
} from "~/components";
import { useSearchParams } from "@solidjs/router";
import { dateTimeLocale } from "~/utilities";

import {
	Weapon,
	AppFile,
	WeaponCreateInput,
} from "~/schemas";

interface WeaponFormProps {
	modal?: boolean;
	modalControl?: Setter<boolean>;
	edit?: Weapon;
}

export const WeaponForm: Component<WeaponFormProps> = (props) => {
	const {
		user,
		weaponsSet,
	} = useStore();

	const [_, setSearchParams] = useSearchParams();

	const defaultFormValues = {
		barrelLength: undefined,
		brand: undefined,
		caliber: [],
		classification: undefined,
		documents: [],
		federation: undefined,
		image: undefined,
		licenseEnd: undefined,
		licenseStart: undefined,
		model: undefined,
		name: "",
		notes: undefined,
		owner: user().id,
		price: 0,
		manufacturerUrl: undefined,
		purchaseDate: undefined,
		seller: undefined,
		sellerUrl: undefined,
		serialNumber: undefined,
		type: "",
	};

	const [form, formSet] = createSignal<WeaponCreateInput>(defaultFormValues);
	const [editForm, editFormSet] = createSignal<Weapon>();
	const [loading, loadingSet] = createSignal(false);
	const [error, errorSet] = createSignal<string | null>(null);
	const [title, titleSet] = createSignal<string>();

	const [existingDocuments, existingDocumentsSet] = createSignal<AppFile[]>([]);
	const [pendingFiles, pendingFilesSet] = createSignal<File[] | null>(null);
	const handleFilesChange = (event: Event) => {
		const input = event.target as HTMLInputElement;
		pendingFilesSet((prev) => [
			...prev ?? [],
			...input.files ?? []
		]);
	};

	let fileInputRef: HTMLInputElement | undefined;

	const [existingImage, existingImageSet] = createSignal<string>();
	const [pendingImage, pendingImageSet] = createSignal<File | null>(null);
	const handleImageChange = (event: Event) => {
		const input = event.target as HTMLInputElement;
		pendingImageSet(() => input.files?.[0] ?? null);
	};

	let imageInputRef: HTMLInputElement | undefined;

	const cancelEdit = () => {
		setSearchParams({ edit: undefined });
		editFormSet();
		formReset();
	};

	const handleInputChange = (
		field: string,
		value: string | string[],
	) => {
		formSet((prev) => ({
			...prev,
			[field]: value,
		}));
	};

	const formReset = () => {
		formSet(defaultFormValues);
		existingDocumentsSet([]);
		pendingFilesSet([]);
		existingImageSet();
		pendingImageSet(null);

		if (props.modal && props.modalControl) {
			props.modalControl(false);
		}
	};

	const handleSubmit = async (event: Event) => {
		event.preventDefault();
		errorSet(null);
		loadingSet(true);

		try {
			const current = form();

			if (
				!current.type
				|| !current.name
			) {
				throw new Error("Ange name och typ.");
			}

			const weaponData: WeaponCreateInput = {
				barrelLength: current.barrelLength,
				brand: current.brand,
				caliber: current.caliber,
				classification: current.classification,
				documents: current.documents,
				federation: current.federation,
				image: current.image,
				licenseEnd: current.licenseEnd || undefined,
				licenseStart: current.licenseStart ? dateTimeLocale({
					dateTime: current.licenseStart,
				}) : undefined,
				manufacturerUrl: current.manufacturerUrl,
				model: current.model,
				name: current.name,
				notes: current.notes,
				owner: current.owner,
				price: current.price,
				purchaseDate: current.purchaseDate,
				seller: current.seller,
				sellerUrl: current.sellerUrl,
				serialNumber: current.serialNumber,
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
				const originalDocumentIds = weaponData.documents || [];
				const currentDocumentIds = existingDocuments().map((document) => document.id);
				const removedIds = originalDocumentIds.filter((id) => !currentDocumentIds.includes(id));

				// Delete removed documents.
				for (const documentId of removedIds) {
					await fileApi.delete(documentId);
				}

				// Upload new documents.
				let documentIds = [...currentDocumentIds];
				const files = pendingFiles();

				if (files?.length) {
					for (const file of files) {
						const fileRecord = await fileApi.create({
							owner: current.owner,
							name: file.name,
							source: file,
							size: file.size,
							type: file.type,
						});
						documentIds.push(fileRecord.id);
					}
				}

				const updatedItem = await weaponsApi.update(
					editForm()!.id,
					{
						...weaponData,
						documents: documentIds,
						image: imageId,
					},
				);

				weaponsSet((prev) =>
					prev.map((item) => (item.id === editForm()!.id ? updatedItem : item))
				);

				showToast({
					title: "Uppdaterat",
					description: `${weaponData.name} uppdaterades`,
					variant: "success",
					duration: 3000,
				});

				formReset();
			} else {
				// Upload file first if one is pending
				let documentIds: string[] = weaponData.documents || [];

				const files = pendingFiles();

				if (files?.length) {
					for (const file of files) {
						const fileRecord = await fileApi.create({
							owner: current.owner,
							name: file.name,
							source: file,
							size: file.size,
							type: file.type,
						});

						documentIds.push(fileRecord.id);
					}
				}

				const newItem = await weaponsApi.create({
					...weaponData,
					documents: documentIds,
					image: imageId,
				});

				weaponsSet((prev) => [...prev, newItem]);

				showToast({
					title: "Tillagt",
					description: `${weaponData.name} lades till i vapenboken`,
					variant: "success",
					duration: 3000,
				});

				formReset();

				if (props.modal && props.modalControl) {
					props.modalControl(false);
				}
			}
		} catch (error) {
			errorSet(error instanceof Error ? error.message : "Något gick fel");
		}

		loadingSet(false);
	};

	const deleteWeapon = async (id: string, name: string) => {
		try {
			const response = await weaponsApi.delete(id);

			if (!response) {
				throw Error("DELETE WEAPON FAILED");
			}

			weaponsSet((prev) => prev.filter((item) => item.id !== id));

			if (props.modal && props.modalControl) {
				props.modalControl(false);
			}
			showToast({
				description: `${name} togs bort från vapenboken`,
				variant: "success",
				duration: 3000,
			});
		} catch (error) {
			console.error(error);

			showToast({
				description: `${name} kunde inte raderas`,
				variant: "error",
				duration: 3000,
			});
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
				<FormFields />
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

			<section class="space-y-6">
				<TextFieldInputGridItem
					key={"name"}
					onChange={handleInputChange}
					required
					title="Namn"
					type="text"
					value={form().name}
				/>

				<SelectGridItem
					key={"type"}
					options={weaponTypes}
					placeholder="Välj typ"
					required
					title="Typ"
					onChange={handleInputChange}
					value={form().type}
				/>

				<TextFieldInputGridItem
					key={"brand"}
					onChange={handleInputChange}
					title="Tillverkare"
					type="text"
					value={form().brand || ""}
				/>

				<TextFieldInputGridItem
					key={"manufacturerUrl"}
					onChange={handleInputChange}
					title="Produktlänk"
					type="text"
					value={form().manufacturerUrl || ""}
				/>

				<TextFieldInputGridItem
					key={"model"}
					onChange={handleInputChange}
					title="Modell"
					type="text"
					value={form().model || ""}
				/>

				<SelectGridItem
					key="caliber"
					onChange={handleInputChange}
					options={calibers}
					placeholder="Kaliber"
					title="Kaliber"
					value={form().caliber || []}
					multiple
				/>

				<TextFieldInputGridItem
					key={"serialNumber"}
					onChange={handleInputChange}
					title="Serienummer"
					type="text"
					value={form().serialNumber || ""}
				/>

				<TextFieldInputGridItem
					key={"barrelLength"}
					onChange={handleInputChange}
					title="Piplängd"
					type="text"
					value={form().barrelLength || ""}
				/>

				<TextFieldInputGridItem
					key={"classification"}
					onChange={handleInputChange}
					title="Skytteform"
					type="text"
					value={form().classification || ""}
				/>

				<SelectGridItem
					key={"federation"}
					options={federations}
					placeholder="Välj förbund"
					title="Förbund"
					onChange={handleInputChange}
					value={form().federation}
				/>

				<TextFieldInputGridItem
					key={"licenseStart"}
					onChange={handleInputChange}
					title="Licens utfärdad datum"
					type="date"
					value={form().licenseStart || ""}
				/>

				<TextFieldInputGridItem
					key={"licenseEnd"}
					onChange={handleInputChange}
					title="Licens utgångsdatum"
					type="date"
					value={form().licenseEnd || ""}
				/>

				<TextFieldInputGridItem
					key={"purchaseDate"}
					onChange={handleInputChange}
					title="Inköpsdatum"
					type="date"
					value={form().purchaseDate || ""}
				/>

				<TextFieldInputGridItem
					key={"price"}
					onChange={handleInputChange}
					title="Pris"
					type="number"
					value={form().price}
				/>

				<TextFieldInputGridItem
					key={"seller"}
					onChange={handleInputChange}
					title="Säljare"
					type="text"
					value={form().seller || ""}
				/>

				<TextFieldInputGridItem
					key={"sellerUrl"}
					onChange={handleInputChange}
					title="Länk till säljare"
					type="text"
					value={form().sellerUrl || ""}
				/>

				<TextFieldAreaGridItem
					key={"notes"}
					onChange={handleInputChange}
					title="Anteckningar"
					value={form().notes || ""}
				/>
			</section>

			<section class="flex flex-col gap-8">
				<div>
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
							{(image) => <FileSource id={image} image />}
						</Show>
					</div>

					<Show when={pendingImage()} keyed>
						{(image) => <img src={URL.createObjectURL(image)} />}
					</Show>
				</div>

				<div>
					<Label>
						Dokument
					</Label>
					<input
						ref={fileInputRef}
						type="file"
						multiple
						class="hidden"
						onChange={handleFilesChange}
						accept="image/*,.pdf,.doc,.docx,.zip,.rar,.tar.gz"
					/>

					<div class="flex gap-4 my-4">
						<Button
							onClick={() => fileInputRef?.click()}
							size="sm"
							variant="outline"
						>
							Välj filer
						</Button>

						<Show when={pendingFiles()?.length}>
							<Button
								onClick={() => pendingFilesSet(null)}
								size="sm"
								variant="default"
							>
								Rensa
							</Button>
						</Show>
					</div>

					<Show when={existingDocuments().length}>
						<div class="flex flex-col gap-4">
							<For each={existingDocuments()}>
								{(file) => (
									<div class="flex gap-4 items-center">
										<Button
											size="sm"
											variant="destructive"
											onClick={() => {
												existingDocumentsSet((prev) => prev.filter((d) => d.id !== file.id));
												formSet((prev) => ({
													...prev,
													documents: prev.documents?.filter((id) => id !== file.id) ?? [],
												}));
											}}
										>
											Ta bort
										</Button>

										<FileSource file={file} double />
									</div>
								)}
							</For>
						</div>
					</Show>

					<Show when={pendingFiles()?.length}>
						<div class="flex flex-col gap-4">
							<For each={pendingFiles()}>
								{(pendingFile) => {
									return (
										<div class="flex gap-2 items-center">
											<Button
												size="sm"
												variant="destructive"
												onClick={() => {
													pendingFilesSet((prev) => prev?.filter((item) => item.name !== pendingFile.name) ?? null)
												}}
											>
												Ta bort
											</Button>
											<div class="text-sm text-muted-foreground">
												{pendingFile.name}
											</div>
										</div>
									);
								}}
							</For>
						</div>
					</Show>
				</div>
			</section>

			<Separator class="mt-4" />

			<div class="flex justify-between items-center">
				<Show when={props.edit} keyed>
					{(weapon) =>
						<div>
							<Dialog>
								<DialogTrigger
									as={Button}
									variant="destructive"
									class="flex-1 w-full"
								>
									Ta bort
								</DialogTrigger>
								<DialogContent class="max-w-sm">
									<DialogHeader>
										<DialogTitle>
											Är du säker på att du vill radera {weapon.name}?
										</DialogTitle>
									</DialogHeader>

									<DialogDescription>
										Detta kommer att ta bort vapnet permanent. Denna åtgärd kan inte ångras.
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
										onClick={() => deleteWeapon(weapon.id, weapon.name)}
									>
										Fortsätt
									</DialogTrigger>
								</DialogContent>
							</Dialog>
						</div>
					}
				</Show>
				<div class="flex justify-end py-4 gap-4">
					<Button
						variant="outline"
						onClick={editForm() ? cancelEdit : formReset}
					>
						Avbryt
					</Button>
					<Button
						type="submit"
						disabled={loading()}
						variant="success"
					>
						<Show
							when={loading()}
							fallback={
								editForm()
									? "Spara"
									: "Lägg till"
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

	createEffect(() => {
		if (props.edit) {
			editFormSet(props.edit);
		}
	});

	createEffect(() => {
		if (editForm()) {
			titleSet("Redigera vapen");
		} else {
			titleSet("Lägg till nytt vapen");
		}
	});

	createEffect(() => {
		if (editForm()) {
			existingDocumentsSet(editForm()!.expand?.documents || []);
			existingImageSet(editForm()!.image);

			formSet({
				barrelLength: editForm()!.barrelLength,
				brand: editForm()!.brand,
				caliber: editForm()!.caliber,
				classification: editForm()!.classification,
				documents: editForm()!.documents || [],
				federation: editForm()!.federation,
				image: editForm()!.image,
				licenseEnd: editForm()!.licenseEnd ? dateTimeLocale({
					dateTime: editForm()!.licenseEnd!,
					withTime: false,
				}) : undefined,
				licenseStart: editForm()!.licenseStart ? dateTimeLocale({
					dateTime: editForm()!.licenseStart!,
					withTime: false,
				}) : undefined,
				manufacturerUrl: editForm()!.manufacturerUrl,
				model: editForm()!.model,
				name: editForm()!.name,
				notes: editForm()!.notes,
				owner: editForm()!.owner || user().id,
				price: editForm()!.price,
				purchaseDate: editForm()!.purchaseDate ? dateTimeLocale({
					dateTime: editForm()!.purchaseDate!,
					withTime: false,
				}) : undefined,
				seller: editForm()!.seller,
				sellerUrl: editForm()!.sellerUrl,
				serialNumber: editForm()!.serialNumber,
				type: editForm()!.type,
			});
		}
	});

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
}
