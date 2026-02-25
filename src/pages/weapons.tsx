import {
	Component,
	createEffect,
	createSignal,
	For,
	Match,
	Show,
	Switch,
} from "solid-js";
import { useStore } from "~/store";
import {
	WeaponForm,
	Card,
	CardContent,
	WeaponDetails,
	LicenseExpiryIndicator,
	DetailsControl,
	DialogContent,
	Dialog,
	FileSource,
	AddWeapon,
	Button,
} from "~/components";
import { useLocation } from "@solidjs/router";
import { Weapon } from "~/schemas";
import { dateTimeLocale } from "~/utilities";

const WeaponsPage: Component = () => {
	const location = useLocation();

	const {
		show,
	} = location.query;

	const {
		weapons,
	} = useStore();

	const [showEditDialog, showEditDialogSet] = createSignal<boolean>(false);
	const [selectedWeapon, selectedWeaponSet] = createSignal<Weapon | null>(null);
	const [editWeapon, editWeaponSet] = createSignal<Weapon>();

	const [detailsControl, detailsControlSet] = createSignal<DetailsControl>();

	const openDrawer = (weapon: Weapon) => {
		selectedWeaponSet(weapon);
		detailsControl()?.open();
	};

	createEffect(() => {
		if (show) {
			const weapon = weapons().find((item) => item.id === show);
			if (weapon) {
				openDrawer(weapon);
			}
		}
	});

	createEffect(() => {
		const editId = location.query.edit;
		if (editId) {
			const weapon = weapons().find((item) => item.id === editId);

			if (weapon) {
				editWeaponSet(weapon);
			}
			return;
		}

		editWeaponSet();
	});

	return (
		<>
			<Dialog
				open={showEditDialog()}
				onOpenChange={showEditDialogSet}
			>
				<DialogContent>
					<WeaponForm
						edit={editWeapon()}
						modal
						modalControl={showEditDialogSet}
					/>
				</DialogContent>
			</Dialog>
			<section>
				<AddWeapon />
			</section>

			<Show when={selectedWeapon()} keyed>
				{(weapon) => (
					<WeaponDetails
						weapon={weapon}
						ref={(control) => detailsControlSet(control)}
					/>
				)}
			</Show>
			<section class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
				<Show when={weapons().length > 0}>
					<For each={weapons()}>
						{(weapon) => (
							<Card>
								<CardContent class="flex flex-col h-full space-y-2">
									<Show when={weapon.image}>
										<FileSource
											id={weapon.image}
											image
											class="mb-auto grow"
										/>
									</Show>

									<h1 class="mt-4">
										{weapon.name}
									</h1>

									<div>
										<Show when={weapon.type}>
											<strong>{weapon.type}</strong>
										</Show>

										<Show when={weapon.caliber}>
											<For each={weapon.caliber}>
												{(caliber) => <span class="mx-2 text-sm">{caliber}</span>}
											</For>
										</Show>
									</div>

									<Show when={weapon.brand || weapon.model}>
										<div class="flex gap-4 text-sm text-muted-foreground">
											<Switch>
												<Match when={weapon.brand && weapon.model}>
													{weapon.brand} | {weapon.model}
												</Match>

												<Match when={weapon.brand}>
													{weapon.brand}
												</Match>

												<Match when={weapon.model}>
													{weapon.model}
												</Match>
											</Switch>
										</div>
									</Show>

									<Show when={weapon.licenseEnd} keyed>
										{(licenseEnd) => (
											<div class="flex gap-2 text-sm text-muted-foreground">
												<LicenseExpiryIndicator licenseEnd={licenseEnd} />
												<div>
													Licens giltig t.om. {dateTimeLocale({
														dateTime: licenseEnd,
													})}
												</div>
											</div>
										)}
									</Show>

									<strong>
										{weapon.activities} aktiviteter
									</strong>
									<strong>
										{weapon.rounds} skott
									</strong>

									<div class="mt-auto">
										<Button
											variant="outline"
											onClick={() => {
												editWeaponSet(weapon);
												showEditDialogSet((prev) => !prev);
											}}
											class="mt-4 w-full"
										>
											Mer
										</Button>
									</div>
								</CardContent>
							</Card>
						)}
					</For>
				</Show>
			</section >
		</>
	);
};

export default WeaponsPage;
