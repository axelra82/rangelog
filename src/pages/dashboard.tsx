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
			<section>
				<ul class="flex flex-col gap-4">
					<For each={weapons()}>
						{(item) => (
							<li class="px-8">
								<WeaponLicenseExpireWarning
									endDate={item.licenseEnd}
									details={`${item.name} (${item.brand} ${item.model})`}
								/>
							</li>
						)}
					</For>
				</ul>
			</section>

			<section class="p-8">
				<h1>Vad vill du göra?</h1>
				<p class="text-muted-foreground mb-6">
				</p>
				<nav class="flex flex-col md:flex-row gap-4 justify-stretch">
					<AddActivity />
					<AddClaim />
					<AddWeapon />
				</nav>
			</section>
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
