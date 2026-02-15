import { For } from "solid-js";
import {
	CardTitle,
	CardHeader,
	CardContent,
	Card,
	WeaponLicenseExpireWarning,
	AddWeapon,
	AddClaim,
	AddActivity,
	Palette,
} from "~/components";
import { useStore } from "~/store";

export const DashboardPage = () => {
	const {
		weapons
	} = useStore();

	return (
		<>
			<ul class="flex flex-col gap-4">
				<For each={weapons()}>
					{(item) => (
						<li>
							<WeaponLicenseExpireWarning
								endDate={item.licenseEnd}
								details={`${item.name} (${item.brand}: ${item.model})`}
							/>
						</li>
					)}
				</For>
			</ul>

			<Card class="my-8">
				<CardHeader>
					<CardTitle class="text-2xl">Vad vill du göra?</CardTitle>
				</CardHeader>
				<CardContent>
					<p class="text-muted-foreground mb-6">
					</p>
					<nav class="flex flex-col md:flex-row gap-4 justify-stretch">
						<AddActivity />
						<AddClaim />
						<AddWeapon />
					</nav>
				</CardContent>
			</Card>
			{/* <Palette
				colors={[
					"info",
					"success",
					"warning",
					"destructive",
					"error",
				]}
				gradients={[
					"",
					"foreground",
				]}
			/>
			<Palette /> */}
		</>
	);
};

export default DashboardPage;
