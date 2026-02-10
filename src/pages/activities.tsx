import {
	AddActivity,
	AddClaim
} from "@/components";

export const ActivitiesPage = () => {

	return (
		<>
			<nav class="py-8">
				<ul class="flex gap-8">
					<li>
						<AddActivity />
					</li>
					<li>
						<AddClaim />
					</li>
				</ul>
			</nav>
			<section>
				Show activity and filtering by dates.
			</section>
		</>
	);
}

export default ActivitiesPage;
