import {
	Component,
	createSignal,
	Show,
	onMount,
	For,
	createEffect,
} from "solid-js";
import { Combobox } from "@kobalte/core/combobox";
import { calibers, federations, weaponTypes } from "~/data";
import { weapons } from "infrastructure";
import { cn, todayISODate } from "~/utilities";
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
	ComboboxContent,
	ComboboxControl,
	ComboboxInput,
	ComboboxItem,
	ComboboxItemIndicator,
	ComboboxItemLabel,
	ComboboxTrigger,
	ConditionalWrapper,
	DialogHeader,
	DialogTitle,
	Label,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	Spinner,
	TextField,
	TextFieldInput,
	TextFieldLabel,
} from "~/components";
import { IconCheck, IconX } from "@tabler/icons-solidjs";

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

type FormTextFieldValues = keyof Omit<FormData, "calibers" | "owner">;

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
		licenseEnd: todayISODate(),
		licenseStart: todayISODate(),
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

	const TextFieldGridItem = (props: {
		required?: boolean;
		title: string;
		type: "text" | "date";
		key: FormTextFieldValues;
	}) => (
		<TextField
			value={form()[props.key]}
			onChange={(value) => handleInputChange(props.key, value)}
			class="grid grid-cols-2"
			{...props.required && { required: true }}
		>
			<TextFieldLabel class="text-sm font-medium">
				{props.title}
				{props.required && " *"}
			</TextFieldLabel>
			<TextFieldInput type={props.type} />
		</TextField>
	);

	const SelectGridItem = <T extends string>(props: {
		key: FormTextFieldValues;
		options: T[];
		placeholder: string;
		required?: boolean;
		title: string;
	}) => (
		<div class="grid grid-cols-2">
			<Label class="text-sm font-medium">
				{props.title}
				{props.required && " *"}
			</Label>
			<Select
				value={form()[props.key]}
				onChange={(value) => handleInputChange(props.key, value ?? "")}
				options={[...props.options]}
				placeholder={props.placeholder}
				itemComponent={(itemProps) => (
					<SelectItem item={itemProps.item}>
						{itemProps.item.rawValue}
					</SelectItem>
				)}
			>
				<SelectTrigger>
					<SelectValue<string>>
						{(state) => state.selectedOption()}
					</SelectValue>
				</SelectTrigger>
				<SelectContent />
			</Select>
		</div>
	);

	const MultiSelectComboboxGridItem = (props: {
		title: string;
		required?: boolean;
		placeholder: string;
		options: string[];
	}) => {

		const [showPlaceholder, showPlaceholderSet] = createSignal<boolean>(true);

		return (
			<div class="grid grid-cols-2">
				<Label class="text-sm font-medium">
					{props.title}
					{props.required && " *"}
				</Label>
				<Combobox<string>
					multiple
					{...props.required && { required: true }}
					options={props.options}
					value={form().calibers}
					onChange={(value: string[]) => handleInputChange("calibers", value)}
					{...showPlaceholder() && { placeholder: props.placeholder }}
					itemComponent={itemProps => (
						<ComboboxItem item={itemProps.item}>
							<div class="flex">
								<div class="w-6 shrink">
									<ComboboxItemIndicator>
										<IconCheck class="size-4 opacity-35" />
									</ComboboxItemIndicator>
								</div>
								<ComboboxItemLabel>{itemProps.item.rawValue}</ComboboxItemLabel>
							</div>
						</ComboboxItem>
					)}
				>
					<ComboboxControl<string>
						class="flex overflow-hidden h-auto items-baseline"
						aria-label={props.title}
					>
						{state => {
							createEffect(() => {
								showPlaceholderSet(state.selectedOptions().length === 0);
							});

							return (
								<>
									<div class={cn(
										"flex flex-wrap gap-2 grow",
										{
											"p-2": state.selectedOptions().length,
										}
									)}>
										<For each={state.selectedOptions()}>
											{option => (
												<div
													class="bg-accent text-sm px-2 py-0.5 rounded inline-flex items-center gap-x-2"
													onPointerDown={e => e.stopPropagation()}
												>
													{option}
													<IconX
														onClick={() => state.remove(option)}
														class="size-3 hover:opacity-80"
													/>
												</div>
											)}
										</For>
										<Show when={state.selectedOptions().length === 0}>
											<ComboboxInput class="border-none focus:ring-0" />
										</Show>
									</div>
									<ComboboxTrigger />
								</>
							);
						}}
					</ComboboxControl>
					<ComboboxContent />
				</Combobox>
			</div>
		);
	};

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
				required
				title="Namn"
				type="text"
				key="name"
			/>

			<SelectGridItem
				key={"type"}
				options={weaponTypes}
				placeholder="Välj typ"
				title="Typ"
				required
			/>

			<TextFieldGridItem
				key="brand"
				required
				title="Tillverkare"
				type="text"
			/>

			<TextFieldGridItem
				key="model"
				required
				title="Modell"
				type="text"
			/>

			<MultiSelectComboboxGridItem
				title="Kaliber"
				required
				placeholder="Kaliber"
				options={calibers}
			/>

			<TextFieldGridItem
				key="serialNumber"
				title="Serienummer"
				type="text"
			/>

			<TextFieldGridItem
				key="barrelLength"
				title="Piplängd"
				type="text"
			/>

			<TextFieldGridItem
				key="classification"
				title="Skytteform"
				type="text"
			/>

			<TextFieldGridItem
				key="weaponGroup"
				title="Vapengrupp"
				type="text"
			/>

			<SelectGridItem
				key={"federation"}
				options={federations}
				placeholder="Välj förbund"
				title="Förbund"
				required
			/>

			<TextFieldGridItem
				key="licenseStart"
				title="Licens utfärdad datum"
				type="date"
			/>

			<TextFieldGridItem
				key="licenseEnd"
				title="Licens utgångsdatum"
				type="date"
			/>

			<div class="flex justify-end pt-4">
				<Button
					type="submit"
					disabled={loading()}
					class="bg-green-600 hover:bg-green-700 text-white px-8"
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
