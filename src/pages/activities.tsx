import {
	AddActivity,
	AddClaim
} from "~/components";
import { useStore } from "~/store";
import { createEffect, For } from "solid-js";
import { activities } from "../../infrastructure/services";
import { ActivityCollectionItem, ReadListResponse } from "~/types";
import { ActivityItem } from "~/components/activities";

export const ActivitiesPage = () => {
	const {
		activities: storeActivities,
		activitiesSet: storeActivitiesSet,
	} = useStore();

	createEffect(async () => {
		const data = await activities.read({}) as ReadListResponse<ActivityCollectionItem>;
		storeActivitiesSet(data.items);
	});

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
				<For each={storeActivities()}>
					{(item) => <ActivityItem {...item} />}
				</For>
			</section>
		</>
	);
}

export default ActivitiesPage;
