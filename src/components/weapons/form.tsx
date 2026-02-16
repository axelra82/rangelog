import {
	Component,
	createSignal,
	Show,
	onMount,
	createEffect,
} from "solid-js";
import {
	calibers,
	federations,
	weaponTypes,
} from "~/data";
import { weapons } from "infrastructure";
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

interface WeaponFormProps {
	modal?: boolean;
	onSuccess?: () => void;
	edit?: boolean;
	weapon?: WeaponCollectionItem;
}

export const WeaponForm: Component<WeaponFormProps> = (props) => {
	const {
		user,
		weaponsSet,
	} = useStore();

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
	const [loading, loadingSet] = createSignal(false);
	const [error, errorSet] = createSignal<string | null>(null);
	const [success, successSet] = createSignal(false);
	const [title, titleSet] = createSignal<string>();

	onMount(() => {
		if (props.edit) {
			titleSet("Redigera vapen");
		} else {
			titleSet("Lägg till nytt vapen");
		}
	});

	createEffect(() => {
		if (props.edit && props.weapon) {
			formSet({
				barrelLength: props.weapon.barrelLength || "",
				brand: props.weapon.brand,
				caliber: props.weapon.caliber,
				classification: props.weapon.classification || "",
				federation: props.weapon.federation,
				licenseEnd: props.weapon.licenseEnd || undefined,
				licenseStart: props.weapon.licenseStart || undefined,
				model: props.weapon.model,
				name: props.weapon.name,
				notes: props.weapon.notes || "",
				owner: props.weapon.owner || user().id,
				serialNumber: props.weapon.serialNumber || "",
				type: props.weapon.type,
			});
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

	const reformSet = () => {
		formSet(defaultFormValues);
	};

	const handleSubmit = async (event: Event) => {
		event.preventDefault();
		errorSet(null);
		successSet(false);
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

			if (props.edit && props.weapon) {
				// Update existing weapon
				const updatedItem = await weapons.update(props.weapon.id, weaponData);
				weaponsSet((prev) =>
					prev.map((w) => (w.id === props.weapon!.id ? updatedItem : w))
				);

				showToast({
					title: "Uppdaterat",
					description: `${weaponData.name} uppdaterades`,
					variant: "success",
					duration: 3000,
				});
			} else {
				// Create new weapon
				const newItem = await weapons.create(weaponData);
				weaponsSet((prev) => [...prev, newItem]);

				showToast({
					title: "Tillagt",
					description: `${weaponData.name} lades till i vapenboken`,
					variant: "success",
					duration: 3000,
				});
			}

			if (!props.edit) {
				reformSet();
			}
			successSet(true);

			if (props.onSuccess) {
				props.onSuccess();
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

			<ComboboxMultiSelectGridItem
				key="caliber"
				onChange={handleInputChange}
				options={calibers}
				placeholder="Kaliber"
				required
				title="Kaliber"
				value={form().caliber}
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

			<div class="flex justify-end pt-4">
				<Button
					type="submit"
					disabled={loading()}
					variant="success"
				>
					<Show when={loading()} fallback={props.edit ? "Spara" : "Lägg till"}>
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
}
