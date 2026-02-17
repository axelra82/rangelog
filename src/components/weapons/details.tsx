import { useSearchParams } from "@solidjs/router";
import { weapons } from "infrastructure/services";
import {
	Component,
	createSignal,
	For,
	onMount,
} from "solid-js";
import {
	DialogTitle,
	DialogContent,
	Button,
	Dialog,
	DialogDescription,
	DialogHeader,
	DialogTrigger,
	LicenseExpiryIndicator,
	Separator,
	showToast,
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
} from "~/components";
import { useStore } from "~/store";
import type { WeaponCollectionItem } from "~/types";
import { cn } from "~/utilities";

export interface DetailsControl {
	open: () => void;
	close: () => void;
	isOpen: () => boolean;
}

export interface DetailsControl {
	open: () => void;
	close: () => void;
	isOpen: () => boolean;
}
interface WeaponDetailsProps {
	weapon: WeaponCollectionItem;
	ref: (control: DetailsControl) => void;
}

interface DetailItemProps {
	isDate?: boolean;
	key: string;
	value?: string;
}

export const WeaponDetails: Component<WeaponDetailsProps> = (props) => {
	const {
		isMobile,
		weaponsSet,
	} = useStore();

	const [open, openSet] = createSignal(false);

	const control: DetailsControl = {
		open: () => openSet(true),
		close: () => openSet(false),
		isOpen: () => open(),
	};

	// Expose control methods to parent
	props.ref?.(control);

	const [_, setSearchParams] = useSearchParams();
	const [items, itemsSet] = createSignal<DetailItemProps[]>([]);
	let detailsControl: DetailsControl | undefined;

	const DetailItem: Component<DetailItemProps> = (props) => {
		const isNote = props.key === "Anteckningar";

		return (
			<div class={cn(
				"flex gap-4",
				{
					"flex-col": isNote,
				}
			)}>
				<span class="text-muted-foreground">
					{props.key}:
				</span>
				<span class={cn(
					{
						"font-medium": !isNote,
						"whitespace-pre-wrap": isNote,
					}
				)}>
					{
						props.value
							?
							props.isDate
								?
								new Date(props.value).toLocaleDateString("sv-SE")
								:
								props.value
							:
							"-"
					}
				</span>
			</div>
		)
	};

	const editWeapon = (weapon: WeaponCollectionItem) => {
		detailsControl?.close();
		detailsControl?.close();
		setSearchParams({ edit: weapon.id });
	};

	const deleteWeapon = (id: string, name: string) => {
		weapons.delete(id);
		showToast({
			title: "Raderat",
			description: `${name} togs bort från vapenboken`,
			variant: "warning",
			duration: 3000,
		});

		weaponsSet((prev) => prev.filter((item) => item.id !== id));
		detailsControl?.close();
		detailsControl?.close();
	};

	onMount(() => {
		itemsSet([
			{
				key: "Typ",
				value: props.weapon.type,
			},
			{
				key: "Tillverkare",
				value: props.weapon.brand,
			},
			{
				key: "Modell",
				value: props.weapon.model,
			},
			{
				isDate: true,
				key: "Licens fr.o.m",
				value: props.weapon.licenseStart,
			},
			{
				isDate: true,
				key: "Licens giltitg t.o.m",
				value: props.weapon.licenseEnd,
			},
			{
				key: "Serienummer",
				value: props.weapon.serialNumber,
			},
			{
				key: "Pipa",
				value: props.weapon.barrelLength,
			},
			{
				key: "Kaliber",
				value: props.weapon.caliber.join(", "),
			},
			{
				key: "Förbund",
				value: props.weapon.federation,
			},
			{
				key: "Vapengrupp",
				value: props.weapon.classification,
			},
			{
				isDate: true,
				key: "Tillagd",
				value: props.weapon.created,
			},
			{
				key: "Anteckningar",
				value: props.weapon.notes,
			},
		]);
	});

	return (
		<>
			<Sheet
				open={open()}
				onOpenChange={openSet}
			>
				<SheetContent
					position="right"
					class={cn(
						"space-y-6",
						isMobile() ? "w-full border-l-0" : "w-lg",
					)}>
					<SheetHeader>
						<SheetTitle class="flex items-center gap-2 text-2xl">
							<LicenseExpiryIndicator size={10} licenseEnd={props.weapon.licenseEnd} /> {props.weapon.name}
						</SheetTitle>
					</SheetHeader>
					<For each={items()}>
						{(item) => <DetailItem {...item} />}
					</For>

					<Separator class="my-4" />

					<div class="flex gap-4 pt-4">
						<Button
							variant="default"
							class="flex-1"
							onClick={() => {
								editWeapon(props.weapon);
								control.close();
							}}
						>
							Redigera
						</Button>

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
										Är du säker på att du vill radera {props.weapon.name}?
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
									onClick={() => deleteWeapon(props.weapon.id, props.weapon.name)}
								>
									Fortsätt
								</DialogTrigger>
							</DialogContent>
						</Dialog>
					</div>


					<Button
						variant="outline"
						class="w-full"
						onClick={() => control.close()}
					>
						Stäng
					</Button>
				</SheetContent>
			</Sheet>
		</>
	);
};
