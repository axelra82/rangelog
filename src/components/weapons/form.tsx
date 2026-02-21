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
import {
	FileCollectionItem,
	WeaponCollectionItem,
	WeaponCreateInput,
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
	showToast,
	Spinner,
	TextFieldAreaGridItem,
	TextFieldInputGridItem,
} from "~/components";
import { useSearchParams } from "@solidjs/router";
import { isoDateTimeToDateInput } from "~/utilities";

interface WeaponFormProps {
	modal?: boolean;
	modalControl?: Setter<boolean>;
	edit?: WeaponCollectionItem;
}

export const WeaponForm: Component<WeaponFormProps> = (props) => {
	const {
		user,
		weaponsSet,
	} = useStore();

	const [_, setSearchParams] = useSearchParams();

	const defaultFormValues = {
		barrelLength: undefined,
		brand: "",
		caliber: [],
		classification: undefined,
		documents: undefined,
		federation: "",
		image: undefined,
		licenseEnd: undefined,
		licenseStart: undefined,
		model: "",
		name: "",
		notes: undefined,
		owner: user().id,
		price: undefined,
		manufacturerUrl: undefined,
		purchaseDate: undefined,
		seller: undefined,
		sellerUrl: undefined,
		serialNumber: "",
		type: "",
	};

	const [form, formSet] = createSignal<WeaponCreateInput>(defaultFormValues);
	const [editForm, editFormSet] = createSignal<WeaponCollectionItem>();
	const [loading, loadingSet] = createSignal(false);
	const [error, errorSet] = createSignal<string | null>(null);
	const [title, titleSet] = createSignal<string>();

	const [existingDocuments, existingDocumentsSet] = createSignal<FileCollectionItem[]>([]);
	const [pendingFiles, pendingFilesSet] = createSignal<File[] | null>(null);
	const handleFilesChange = (event: Event) => {
		const input = event.target as HTMLInputElement;
		pendingFilesSet((prev) => [
			...prev ?? [],
			...input.files ?? []
		]);
	};

	let fileInputRef: HTMLInputElement | undefined;

	const cancelEdit = () => {
		setSearchParams({ edit: undefined });
		editFormSet();
		reformSet();
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

	const reformSet = () => {
		formSet(defaultFormValues);
	};

	const handleSubmit = async (event: Event) => {
		event.preventDefault();
		errorSet(null);
		loadingSet(true);

		try {
			const current = form();

			if (
				!current.federation
				|| !current.caliber.length
				|| !current.type
				|| !current.brand
				|| !current.model
			) {
				throw new Error("Ange tillverkare, model, förbund, kaliber och typ.");
			}

			// Upload file first if one is pending
			let documentIds: string[] = current.documents ?? [];

			const files = pendingFiles();

			if (files) {
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

			const weaponData: WeaponCreateInput = {
				barrelLength: current.barrelLength,
				brand: current.brand,
				caliber: current.caliber,
				classification: current.classification,
				documents: documentIds,
				federation: current.federation,
				image: current.image,
				licenseEnd: current.licenseEnd || undefined,
				licenseStart: current.licenseStart || undefined,
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

			if (editForm()) {
				const updatedItem = await weaponsApi.update(editForm()!.id, weaponData);

				weaponsSet((prev) =>
					prev.map((item) => (item.id === editForm()!.id ? updatedItem : item))
				);

				showToast({
					title: "Uppdaterat",
					description: `${weaponData.name} uppdaterades`,
					variant: "success",
					duration: 3000,
				});
			} else {
				const newItem = await weaponsApi.create(weaponData);
				weaponsSet((prev) => [...prev, newItem]);

				showToast({
					title: "Tillagt",
					description: `${weaponData.name} lades till i vapenboken`,
					variant: "success",
					duration: 3000,
				});

				reformSet();
				pendingFilesSet(null);

				if (props.modal && props.modalControl) {
					props.modalControl(false);
				}
			}
		} catch (error) {
			errorSet(error instanceof Error ? error.message : "Något gick fel");
		}

		loadingSet(false);
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
					required
					title="Tillverkare"
					type="text"
					value={form().brand}
				/>

				<TextFieldInputGridItem
					key={"manufacturerUrl"}
					onChange={handleInputChange}
					title="Produktlänk"
					type="text"
					value={form().manufacturerUrl}
				/>

				<TextFieldInputGridItem
					key={"model"}
					onChange={handleInputChange}
					required
					title="Modell"
					type="text"
					value={form().model}
				/>

				<SelectGridItem
					key="caliber"
					onChange={handleInputChange}
					options={calibers}
					placeholder="Kaliber"
					required
					title="Kaliber"
					value={form().caliber}
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
					required
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
					value={form().licenseEnd || ""}
					onChange={handleInputChange}
					title="Licens utgångsdatum"
					type="date"
				/>

				<TextFieldInputGridItem
					key={"purchaseDate"}
					value={form().purchaseDate || ""}
					onChange={handleInputChange}
					title="Inköpsdatum"
					type="date"
				/>

				<TextFieldInputGridItem
					key={"price"}
					value={form().price}
					onChange={handleInputChange}
					title="Pris"
					type="number"
				/>

				<TextFieldInputGridItem
					key={"seller"}
					value={form().seller || ""}
					onChange={handleInputChange}
					title="Säljare"
					type="text"
				/>

				<TextFieldInputGridItem
					key={"sellerUrl"}
					value={form().sellerUrl || ""}
					onChange={handleInputChange}
					title="Länk till säljare"
					type="text"
				/>

				<TextFieldAreaGridItem
					key={"notes"}
					onChange={handleInputChange}
					title="Anteckningar"
					value={form().notes || ""}
				/>
			</section>

			<h3>
				Dokument
			</h3>

			<input
				ref={fileInputRef}
				type="file"
				multiple
				class="hidden"
				onChange={handleFilesChange}
			/>

			<div class="flex gap-4">
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
						{(doc) => (
							<div class="flex gap-2 items-center">
								<Button
									size="sm"
									variant="destructive"
									onClick={() => {
										existingDocumentsSet((prev) => prev.filter((d) => d.id !== doc.id));
										formSet((prev) => ({
											...prev,
											documents: prev.documents?.filter((id) => id !== doc.id) ?? [],
										}));
									}}
								>
									Ta bort
								</Button>
								<div class="text-sm text-muted-foreground">
									{doc.name}
								</div>
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

			<div class="flex justify-end pt-4 gap-4">
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
			formSet({
				barrelLength: editForm()!.barrelLength,
				brand: editForm()!.brand,
				caliber: editForm()!.caliber,
				classification: editForm()!.classification,
				documents: editForm()!.documents || [],
				federation: editForm()!.federation,
				image: editForm()!.image,
				licenseEnd: editForm()!.licenseEnd ? isoDateTimeToDateInput(editForm()!.licenseEnd!) : undefined,
				licenseStart: editForm()!.licenseStart ? isoDateTimeToDateInput(editForm()!.licenseStart!) : undefined,
				manufacturerUrl: editForm()!.manufacturerUrl,
				model: editForm()!.model,
				name: editForm()!.name,
				notes: editForm()!.notes,
				owner: editForm()!.owner || user().id,
				price: editForm()!.price,
				purchaseDate: editForm()!.purchaseDate ? isoDateTimeToDateInput(editForm()!.purchaseDate!) : undefined,
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
