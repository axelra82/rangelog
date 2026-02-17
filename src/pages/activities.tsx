import {
	AddActivity,
	AddClaim,
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger
} from "~/components";
import { useStore } from "~/store";
import { createEffect, For } from "solid-js";
import { activities } from "infrastructure/services";
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
			<Tabs defaultValue="activities">
				<TabsList class="grid grid-cols-2 w-50">
					<TabsTrigger value="activities">Skytte</TabsTrigger>
					<TabsTrigger value="claims">Fordringar</TabsTrigger>
				</TabsList>
				<TabsContent
					value="activities"
					class="my-8 bg-accent rounded-lg p-4"
				>
					<For each={storeActivities()}>
						{(item, index) => <ActivityItem {...item} isLast={storeActivities().length === index() + 1} />}
					</For>
				</TabsContent>
				<TabsContent value="claims">
					<section class="p-8">
						<h1>WIP</h1>
					</section>
				</TabsContent>
			</Tabs>
		</>
	);
}

export default ActivitiesPage;
