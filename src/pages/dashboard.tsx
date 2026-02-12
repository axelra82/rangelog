import {
	AddActivity,
	AddClaim,
	AddWeapon,
} from "@/components";

export const DashboardPage = () => {

	return (
		<>
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
