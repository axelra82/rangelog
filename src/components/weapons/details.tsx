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
	Drawer,
	DrawerControl,
	LicenseExpiryIndicator,
	Separator,
	showToast,
} from "~/components";
import { useStore } from "~/store";
import type { WeaponCollectionItem } from "~/types";

interface WeaponDrawerProps {
	weapon: WeaponCollectionItem;
	ref: (control: DrawerControl) => void;
}

interface DetailItemProps {
	isDate?: boolean;
	key: string;
	value?: string;
}

export const WeaponDrawer: Component<WeaponDrawerProps> = (props) => {
	const {
		weapons: storeWeapons,
		weaponsSet,
	} = useStore();

	const [items, itemsSet] = createSignal<DetailItemProps[]>([]);
	let drawerControl: DrawerControl | undefined;

	const DetailItem: Component<DetailItemProps> = (props) => (
		<div class="flex gap-4">
			<span class="text-muted-foreground">
				{props.key}:
			</span>
			<strong>{
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
			</strong>
		</div>
	);

	const deleteWeapon = (id: string, name: string) => {
		weapons.delete(id);
		showToast({
			title: "Raderat",
			description: `${name} togs bort från vapenboken`,
			variant: "warning",
			duration: 3000,
		});

		weaponsSet((prev) => prev.filter((item) => item.id !== id));
		drawerControl?.close();
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
		]);
	});

	return (
		<>
			<Drawer
				title={
					<span class="flex items-center gap-2">
						<LicenseExpiryIndicator size={10} licenseEnd={props.weapon.licenseEnd} /> {props.weapon.name}
					</span>
				}
				ref={(control) => {
					drawerControl = control;
					props.ref?.(control);
				}}
			>
				<>
					<For each={items()}>
						{(item) => <DetailItem {...item} />}
					</For>

					<Separator class="my-4" />

					<div class="flex gap-4 pt-4">
						<Button
							variant="info"
							class="flex-1"
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
						onClick={() => drawerControl?.close()}
					>
						Stäng
					</Button>

				</>
			</Drawer>
		</>
	);
};
