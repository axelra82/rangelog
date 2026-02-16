import {
	Component,
	createSignal,
	For,
	Show,
} from "solid-js";
import { useStore } from "~/store";
import {
	Button,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
	ManageWeaponForm,
	Card,
	CardContent,
	WeaponDrawer,
	DrawerControl,
	LicenseExpiryIndicator,
} from "~/components";
import {
	IconChevronRight,
	IconAlertCircle,
	IconAlertTriangle,
} from "@tabler/icons-solidjs";
import { licenseExpiryStatusMessage } from "~/utilities";
import { WeaponCollectionItem } from "~/types";

export const WeaponsPage: Component = () => {
	const { weapons } = useStore();

	const [selectedWeapon, selectedWeaponSet] = createSignal<WeaponCollectionItem | null>(null);
	let drawerControl: DrawerControl | undefined;

	const openDrawer = (weapon: WeaponCollectionItem) => {
		selectedWeaponSet(weapon);
		drawerControl?.open();
	};

	return (
		<section class="space-y-6">
			<Show
				when={weapons().length > 0}
				fallback={
					<Card>
						<CardContent>
							Inga vapen i vapenboken. Lägg till nedan.
						</CardContent>
					</Card>
				}
			>
				<div class="rounded-lg border border-border">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>
									Namn
								</TableHead>
								<TableHead>
									Typ
								</TableHead>
								<TableHead class="w-fit">
									Licens Utg.
								</TableHead>
								<TableHead class="w-5" />
							</TableRow>
						</TableHeader>
						<TableBody>
							<For each={weapons()}>
								{(weapon) => (
									<TableRow
										onClick={() => openDrawer(weapon)}
										class="cursor-pointer h-12"
									>
										<TableCell>
											<div class="flex gap-2 items-center">
												<LicenseExpiryIndicator licenseEnd={weapon.licenseEnd} />
												{weapon.name}
											</div>
										</TableCell>
										<TableCell>
											{weapon.type}
										</TableCell>
										<TableCell>
											<div class="flex items-center gap-2">
												{weapon.licenseEnd ? new Date(weapon.licenseEnd).toLocaleDateString("sv-SE") : ""}
											</div>
										</TableCell>
										<TableCell class="text-right">
											<IconChevronRight class="size-4" />
										</TableCell>
									</TableRow>
								)}
							</For>
						</TableBody>
					</Table>
				</div>
			</Show>

			<ManageWeaponForm />

			<Show when={selectedWeapon()} keyed>
				{(weapon) => (
					<WeaponDrawer
						weapon={weapon}
						ref={(control) => drawerControl = control}
					/>
				)}
			</Show>
		</section>
	);
};

export default WeaponsPage;
