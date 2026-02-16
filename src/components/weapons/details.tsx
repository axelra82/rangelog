import { Component, createSignal, For, onMount } from "solid-js";
import { Button, Drawer, DrawerControl, LicenseExpiryIndicator } from "~/components";
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

	const [items, itemsSet] = createSignal<DetailItemProps[]>([]);

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
		<Drawer
			title={
				<span class="flex items-center gap-2">
					<LicenseExpiryIndicator size={10} licenseEnd={props.weapon.licenseEnd} /> {props.weapon.name}
				</span>
			}
			ref={props.ref}
		>
			<>
				<For each={items()}>
					{(item) => <DetailItem {...item} />}
				</For>
				{/* Action Buttons */}
				<div class="flex gap-2 pt-4">
					<Button variant="default" class="flex-1">
						Redigera
					</Button>
					<Button variant="destructive" class="flex-1">
						Ta bort
					</Button>
				</div>
			</>
		</Drawer>
	);
};
