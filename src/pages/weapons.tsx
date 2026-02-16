import {
	Component,
	createEffect,
	createSignal,
	For,
	Show,
} from "solid-js";
import { useStore } from "~/store";
import {
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
	CardHeader,
	CardTitle,
} from "~/components";
import {
	IconChevronRight,
} from "@tabler/icons-solidjs";
import { ActivityWeaponEntry, ReadListResponse, WeaponCollectionItem } from "~/types";
import { activitiesWeapons } from "infrastructure";

export const WeaponsPage: Component = () => {
	const {
		weapons,
	} = useStore();

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
						<CardHeader>
							<CardTitle>
								Inga vapen i vapenboken
							</CardTitle>
						</CardHeader>
						<CardContent>
							Lägg till ditt första vapen med hjälpa av fromuläret nedan.
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
								<TableHead>
									Aktiviter
								</TableHead>
								<TableHead class="w-max">
									Licens Utg.
								</TableHead>
								<TableHead class="w-5" />
							</TableRow>
						</TableHeader>
						<TableBody>
							<For each={weapons()}>
								{(weapon) => {
									const [act, actSet] = createSignal<string | number>("-");


									createEffect(async () => {
										const activity = await activitiesWeapons.read({
											filter: `weapon = "${weapon.id}"`
										}) as ReadListResponse<ActivityWeaponEntry>;

										if (activity.totalItems > 0) {
											actSet(activity.totalItems);
										}
									});

									return (
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
												{act()}
											</TableCell>
											<TableCell>
												<div class="flex items-center gap-2">
													{weapon.licenseEnd ? new Date(weapon.licenseEnd).toLocaleDateString("sv-SE") : "-"}
												</div>
											</TableCell>
											<TableCell class="text-right">
												<IconChevronRight class="size-4" />
											</TableCell>
										</TableRow>
									)
								}}
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
