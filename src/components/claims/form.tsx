import {
	Component,
	createSignal,
	Show,
	createEffect,
	Setter,
} from "solid-js";
import { clubs } from "~/data/clubs";
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
} from "~/components";
import { useSearchParams } from "@solidjs/router";
import { claims as claimsApi } from "infrastructure";
import { federations, Calibers, claims } from "~/data";

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
		club: "",
		date: todayISODate(true),
		location: "",
		notes: "",
		owner: user().id,
		rangeMaster: "",
		type: "",
		federation: "",
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

	const handleInputChange = (field: string, value: string | string[]) => {
		formSet((prev) => ({ ...prev, [field]: value }));
	};

	const reformSet = () => {
		formSet(defaultFormValues);
	};

	const cancelEdit = () => {
		setSearchParams({ edit: undefined });
		editFormSet();
		reformSet();
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
				|| !current.federation
			) {
				throw new Error("Ange datum, fordran och förbund.");
			}

			const claimData: ClaimCreateInput = {
				club: current.club,
				date: isoDateTimeToDateInput(current.date, true, true),
				federation: current.federation,
				location: current.location,
				notes: current.notes,
				owner: user().id,
				rangeMaster: current.rangeMaster,
				type: current.type,
			};

			if (editForm()) {
				const updatedItem = await claimsApi.update(editForm()!.id, claimData);

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
				const newItem = await claimsApi.create(claimData);

				claimsSet((prev) => [...prev, newItem]);

				showToast({
					description: "Fordringen sparades",
					variant: "success",
					duration: 3000,
				});

				reformSet();
			}

			closeModal();
		} catch (err) {
			errorSet(err instanceof Error ? err.message : "Något gick fel");
		}

		loadingSet(false);
	};

	createEffect(() => {
		if (props.edit) editFormSet(props.edit);
	});

	createEffect(() => {
		titleSet(editForm() ? "Redigera fordring" : "Spara fordring");
	});

	createEffect(() => {
		if (editForm()) {
			formSet({
				club: editForm()!.club ?? "",
				date: isoDateTimeToDateInput(editForm()!.date, true, true),
				federation: editForm()!.federation,
				location: editForm()!.location,
				notes: editForm()!.notes || "",
				owner: user().id,
				rangeMaster: editForm()!.rangeMaster,
				type: editForm()!.type,
			});
		}
	});

	const FormFields = () => (
		<form onSubmit={handleSubmit} class="space-y-6">
			<Show when={error()}>
				<Alert variant="destructive">
					<AlertDescription>{error()}</AlertDescription>
				</Alert>
			</Show>

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
				<div class="px-6 pb-6">
					<FormFields />
				</div>
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
			condition={!Boolean(props.modal)}
			wrapper={(wrapperChildren) => <Card>{wrapperChildren}</Card>}
		>
			<FormContent />
		</ConditionalWrapper>
	);
};
