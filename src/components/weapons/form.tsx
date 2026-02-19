import {
	Component,
	createEffect,
	createSignal,
	Setter,
	Show,
} from "solid-js";
import {
	calibers,
	federations,
	weaponTypes,
} from "~/data";
import { weapons as weaponsApi } from "infrastructure";
import {
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
	ComboboxMultiSelectGridItem,
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
		barrelLength: "",
		brand: "",
		caliber: [],
		classification: "",
		federation: "",
		licenseEnd: undefined,
		licenseStart: undefined,
		model: "",
		name: "",
		notes: "",
		owner: user().id,
		serialNumber: "",
		type: "",
	};

	const [form, formSet] = createSignal<WeaponCreateInput>(defaultFormValues);
	const [editForm, editFormSet] = createSignal<WeaponCollectionItem>();
	const [loading, loadingSet] = createSignal(false);
	const [error, errorSet] = createSignal<string | null>(null);
	const [title, titleSet] = createSignal<string>();

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

			const weaponData: WeaponCreateInput = {
				barrelLength: current.barrelLength,
				brand: current.brand,
				caliber: current.caliber,
				classification: current.classification,
				federation: current.federation,
				licenseEnd: current.licenseEnd || undefined,
				licenseStart: current.licenseStart || undefined,
				model: current.model,
				name: current.name,
				owner: current.owner,
				serialNumber: current.serialNumber,
				type: current.type,
				notes: current.notes,
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

				<TextFieldAreaGridItem
					key={"notes"}
					onChange={handleInputChange}
					title="Anteckningar"
					value={form().notes || ""}
				/>
			</section>

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
			formSet({
				barrelLength: editForm()!.barrelLength || "",
				brand: editForm()!.brand,
				caliber: editForm()!.caliber,
				classification: editForm()!.classification || "",
				federation: editForm()!.federation,
				licenseEnd: editForm()!.licenseEnd ? isoDateTimeToDateInput(editForm()!.licenseEnd!) : undefined,
				licenseStart: editForm()!.licenseStart ? isoDateTimeToDateInput(editForm()!.licenseStart!) : undefined,
				model: editForm()!.model,
				name: editForm()!.name,
				notes: editForm()!.notes || "",
				owner: editForm()!.owner || user().id,
				serialNumber: editForm()!.serialNumber || "",
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
