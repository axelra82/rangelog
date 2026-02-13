import {
	AddActivity,
	AddClaim,
	AddWeapon,
} from "~/components";
import { WeaponLicenseExpireWarning } from "~/components/weapons";
import { useStore } from "~/store";
import { For } from "solid-js";

export const DashboardPage = () => {
	const {
		weapons
	} = useStore();

	return (
		<>
			<section>
				<For each={weapons()}>
					{(item) => (
						<WeaponLicenseExpireWarning
							endDate={item.licenseEnd}
							details={`${item.name} (${item.brand}: ${item.model})`}
						/>
					)}
				</For>
			</section>
			<nav class="mt-12">
				<ul class="flex flex-col md:flex-row gap-8 justify-center">
					<li>
						<AddActivity />
					</li>
					<li>
						<AddClaim />
					</li>
					<li>
						<AddWeapon />
					</li>
				</ul>
			</nav>
		</>
	);
}

export default DashboardPage;
