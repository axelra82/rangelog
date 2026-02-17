import {
	ActivityItem,
	AddActivity,
	AddClaim,
	ClaimItem,
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "~/components";
import { useStore } from "~/store";
import { createEffect, For, Show } from "solid-js";
import {
	activities as activitiesApi,
	claims as claimsApi,
} from "infrastructure";
import {
	ActivityCollectionItem,
	ClaimCollectionItem,
	ReadListResponse,
} from "~/types";

export const ActivitiesPage = () => {
	const {
		activities,
		activitiesSet,
		claims,
		claimsSet,
	} = useStore();

	createEffect(async () => {
		const activitiesData = await activitiesApi.read({
			expand: "activity_weapons(activity)"
		}) as ReadListResponse<ActivityCollectionItem>;


		const claimsData = await claimsApi.read({}) as ReadListResponse<ClaimCollectionItem>;

		activitiesSet(activitiesData.items);
		claimsSet(claimsData.items);
	});

	return (
		<>
			<nav class="py-8">
				<ul class="flex gap-4">
					<li>
						<AddActivity />
					</li>
					<li>
						<AddClaim />
					</li>
				</ul>
			</nav>
			<Tabs defaultValue="activities">
				<TabsList class="grid grid-cols-2 md:w-52">
					<TabsTrigger value="activities">Skytte</TabsTrigger>
					<TabsTrigger value="claims">Fordringar</TabsTrigger>
				</TabsList>
				<TabsContent
					value="activities"
					class="my-8 bg-accent rounded-lg py-4 px-8"
				>
					<Show when={!activities().length}>
						<h2>
							Inga skytteaktiviteter loggade.
						</h2>
					</Show>
					<For each={activities()}>
						{(item, index) => (
							<ActivityItem
								{...item}
								isLast={activities().length === index() + 1}
							/>
						)}
					</For>
				</TabsContent>
				<TabsContent
					value="claims"
					class="my-8 bg-accent rounded-lg py-4 px-8"
				>
					<Show when={!claims().length}>
						<h2>
							Inga fordringar sparade.
						</h2>
					</Show>
					<For each={claims()}>
						{(item, index) => (
							<ClaimItem
								{...item}
								isLast={claims().length === index() + 1}
							/>
						)}
					</For>
				</TabsContent>
			</Tabs>
		</>
	);
}

export default ActivitiesPage;
