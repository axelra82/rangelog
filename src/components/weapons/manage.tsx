import {
	Component,
	createSignal,
	Show,
	onMount,
} from "solid-js";
import { calibers, federations, weaponTypes } from "~/data";
import { weapons } from "infrastructure";
import { WeaponCreateInput } from "~/types";
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
	Spinner,
	TextFieldGridItem,
} from "~/components";

interface CreateWeaponFormProps {
	modal?: boolean;
	onSuccess?: () => void;
}

type FormData = {
	barrelLength: string;
	brand: string;
	calibers: string[];
	classification: string;
	federation: string;
	licenseEnd: string;
	licenseStart: string;
	model: string;
	name: string;
	owner: string;
	serialNumber: string;
	type: string;
	weaponGroup: string;
};

export const ManageWeaponForm: Component<CreateWeaponFormProps> = (props) => {
	const {
		user,
		weaponsSet,
	} = useStore();

	const defaultFormValues = {
		barrelLength: "",
		brand: "",
		calibers: [],
		classification: "",
		federation: "",
		licenseEnd: "",
		licenseStart: "",
		model: "",
		name: "",
		owner: user().id,
		serialNumber: "",
		type: "",
		weaponGroup: "",
	}

	const [form, formSet] = createSignal<FormData>(defaultFormValues);
	const [loading, loadingSet] = createSignal(false);
	const [error, errorSet] = createSignal<string | null>(null);
	const [success, successSet] = createSignal(false);
	const [title, titleSet] = createSignal<string>();
	const [eventNote, eventNoteSet] = createSignal<string>();

	onMount(() => {
		titleSet("Lägg till nytt vapen");
		eventNoteSet("Vapen tillagt");
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

			if (!current.federation || !current.calibers.length || !current.type) {
				throw new Error("Välj förbund, kaliber och typ.");
			}

			const weaponData: WeaponCreateInput = {
				barrelLength: current.barrelLength,
				brand: current.brand,
				caliber: current.calibers,
				classification: current.classification,
				federation: current.federation,
				licenseEnd: current.licenseEnd || undefined,
				licenseStart: current.licenseStart || undefined,
				model: current.model,
				name: current.name,
				owner: current.owner,
				serialNumber: current.serialNumber,
				type: current.type,
			};

			const newItem = await weapons.create(weaponData);
			weaponsSet((prev) => [...prev, newItem]);

			reformSet();
			successSet(true);

			if (props.onSuccess) {
				setTimeout(() => {
					props.onSuccess!();
				}, 1000);
			}
		} catch (error) {
			errorSet(error instanceof Error ? error.message : "Något gick fel");
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

			<TextFieldGridItem
				key={"brand"}
				onChange={handleInputChange}
				required
				title="Tillverkare"
				type="text"
				value={form().brand}
			/>

			<TextFieldGridItem
				key={"model"}
				onChange={handleInputChange}
				required
				title="Modell"
				type="text"
				value={form().model}
			/>

			<ComboboxMultiSelectGridItem
				key="calibers"
				onChange={handleInputChange}
				options={calibers}
				placeholder="Kaliber"
				required
				title="Kaliber"
				value={form().calibers}
			/>

			<TextFieldGridItem
				key={"serialNumber"}
				onChange={handleInputChange}
				title="Serienummer"
				type="text"
				value={form().serialNumber}
			/>

			<TextFieldGridItem
				key={"barrelLength"}
				onChange={handleInputChange}
				title="Piplängd"
				type="text"
				value={form().barrelLength}
			/>

			<TextFieldGridItem
				key={"classification"}
				onChange={handleInputChange}
				title="Skytteform"
				type="text"
				value={form().classification}
			/>

			<TextFieldGridItem
				key={"weaponGroup"}
				onChange={handleInputChange}
				title="Vapengrupp"
				type="text"
				value={form().weaponGroup}
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

			<TextFieldGridItem
				key={"licenseStart"}
				onChange={handleInputChange}
				title="Licens utfärdad datum"
				type="date"
				value={form().licenseStart}
			/>

			<TextFieldGridItem
				key={"licenseEnd"}
				value={form().licenseEnd}
				onChange={handleInputChange}
				title="Licens utgångsdatum"
				type="date"
			/>

			<div class="flex justify-end pt-4">
				<Button
					type="submit"
					disabled={loading()}
					variant="success"
				>
					<Show when={loading()} fallback="Lägg till">
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
