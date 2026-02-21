import { For } from "solid-js";
import {
	WeaponLicenseExpireWarning,
	AddWeapon,
	AddClaim,
	AddActivity,
	Palette,
	Card,
	CardHeader,
	CardTitle,
	CardContent,
} from "~/components";
import { useStore } from "~/store";

const DashboardPage = () => {
	const {
		user,
		weapons
	} = useStore();

	return (
		<>
			<section>
				<ul class="flex flex-col gap-4">
					<For each={weapons()}>
						{(item) => (
							<li class="px-4 py-2">
								<WeaponLicenseExpireWarning
									endDate={item.licenseEnd}
									details={`${item.name} (${item.brand} ${item.model})`}
								/>
							</li>
						)}
					</For>
				</ul>
			</section>

			<section class="py-8 px-4">
				<h1>Vad vill du göra?</h1>
				<p class="text-muted-foreground mb-6">
				</p>
				<nav class="flex flex-col md:flex-row gap-4 justify-stretch">
					<AddActivity />
					<AddClaim />
					<AddWeapon />
				</nav>
			</section>

			<Card class="py-8 mx-4 text-center">
				<CardHeader>
					<CardTitle>
						<h1>
							Överblick
						</h1>
					</CardTitle>
				</CardHeader>
				<CardContent class="flex flex-col md:flex-row gap-12 justify-around mt-8">
					<section>
						<strong>Aktiviteter</strong>
						<p class="text-7xl font-black">
							{user().activities}
						</p>
					</section>

					<section class="text-center">
						<strong>Vapen</strong>
						<p class="text-center text-7xl font-black">
							{user().weapons}
						</p>
					</section>
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
