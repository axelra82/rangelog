import { Component, For, Show } from "solid-js";
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
} from "~/components";
import { IconChevronRight, IconAlertCircle, IconAlertTriangle } from "@tabler/icons-solidjs";
import { licenseExpiryStatusMessage } from "~/utilities";

export const WeaponsPage: Component = () => {
	const { weapons } = useStore();

	const LicenseExpiryIndicator: Component<{ licenseEnd?: string }> = (props) => {
		const result = licenseExpiryStatusMessage(props.licenseEnd);

		return (
			<Show when={result?.status} keyed>
				{(status) => (<div class="inline-flex items-center gap-1">
					<Show
						when={status === "error"}
						fallback={
							<IconAlertTriangle class="size-4 text-orange-500" />
						}
					>
						<IconAlertCircle class="size-4 text-red-500" />
					</Show>
				</div>
				)}
			</Show>
		);
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
								<TableHead>
									Licens Utg.
								</TableHead>
								<TableHead />
							</TableRow>
						</TableHeader>
						<TableBody>
							<For each={weapons()}>
								{(weapon) => (
									<TableRow>
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
											<Button variant="ghost" size="icon">
												<IconChevronRight class="size-4" />
											</Button>
										</TableCell>
									</TableRow>
								)}
							</For>
						</TableBody>
					</Table>
				</div>
			</Show>

			<ManageWeaponForm />
		</section>
	);
};

export default WeaponsPage;
