import {
	ActivityItem,
	AddActivity,
	AddClaim,
	Button,
	ClaimItem,
	Icon,
	Separator,
	Spinner,
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "~/components";
import { useStore } from "~/store";
import { Component, createSignal, For, onCleanup, onMount, Show } from "solid-js";
import {
	activities as activitiesApi,
	claims as claimsApi,
} from "infrastructure";
import {
	ActivityCollectionItem,
	ClaimCollectionItem,
	Icons,
	ReadListResponse,
} from "~/types";

export const ActivitiesPage = () => {
	const {
		activities,
		activitiesSet,
		claims,
		claimsSet,
	} = useStore();

	const perPage = 20;

	const [sort, sortSet] = createSignal<"+" | "-">("-");

	const [activitiesTotal, activitiesTotalSet] = createSignal(0);
	const [activitiesPageCount, activitiesPageCountSet] = createSignal(-1);
	const [activitiesCurrentPage, activitiesCurrentPageSet] = createSignal(1);
	const [loadingActivities, loadingActivitiesSet] = createSignal(false);

	const hasMoreActivities = () => activitiesPageCount() === -1
		|| activitiesCurrentPage() <= activitiesPageCount();

	let activitiesSentinelRef: HTMLDivElement | undefined;

	const [claimsTotal, claimsTotalSet] = createSignal(0);
	const [claimsPageCount, claimsPageCountSet] = createSignal(-1);
	const [claimsCurrentPage, claimsCurrentPageSet] = createSignal(1);
	const [loadingClaims, loadingClaimsSet] = createSignal(false);

	const hasMoreClaims = () => claimsPageCount() === -1
		|| claimsCurrentPage() <= claimsPageCount();

	let claimsSentinelRef: HTMLDivElement | undefined;

	const toggleSort = () => {
		sortSet((prev) => prev === "-" ? "+" : "-");

		activitiesCurrentPageSet(1);
		activitiesPageCountSet(-1);
		activitiesSet([]);

		claimsCurrentPageSet(1);
		claimsPageCountSet(-1);
		claimsSet([]);
		getActivities();
		getClaims();
	};

	const getActivities = async () => {
		if (loadingActivities() || !hasMoreActivities()) {
			return
		};

		loadingActivitiesSet(true);

		try {
			const data = await activitiesApi.read({
				expand: "activity_weapons(activity)",
				sort: `${sort()}date`,
				perPage,
				page: activitiesCurrentPage(),
			}) as ReadListResponse<ActivityCollectionItem>;

			if (activitiesCurrentPage() === 1) {
				activitiesTotalSet(data.totalItems);
			}

			activitiesCurrentPageSet((prev) => prev + 1);
			activitiesPageCountSet(data.totalPages);

			activitiesSet((prev) => [
				...prev,
				...data.items,
			]);

			requestAnimationFrame(() => {
				const sentinelVisible = activitiesSentinelRef &&
					activitiesSentinelRef.getBoundingClientRect().top < window.innerHeight;

				if (sentinelVisible) {
					getActivities();
				}
			});
		} catch (error) {
			console.error(error);
		} finally {
			loadingActivitiesSet(false);
		}
	}

	const getClaims = async () => {
		if (loadingClaims() || !hasMoreClaims()) {
			return
		};

		loadingClaimsSet(true);

		try {
			const data = await claimsApi.read({
				sort: `${sort()}date`,
				perPage,
				page: claimsCurrentPage(),
			}) as ReadListResponse<ClaimCollectionItem>;

			if (claimsCurrentPage() === 1) {
				claimsTotalSet(data.totalItems);
			}

			claimsCurrentPageSet((prev) => prev + 1);
			claimsPageCountSet(data.totalPages);
			claimsSet((prev) => [
				...prev,
				...data.items,
			]);
		} catch (error) {
			console.error(error);
		} finally {
			loadingClaimsSet(false);
		}
	}

	onMount(() => {
		getActivities();
		getClaims();

		const threshold = 0;

		const activitiesObserver = new IntersectionObserver(
			(entries) => {
				if (
					entries[0].isIntersecting
					&& hasMoreActivities()
				) {
					getActivities();
				}
			},
			{
				threshold,
			}
		);

		if (activitiesSentinelRef) {
			activitiesObserver.observe(activitiesSentinelRef);
		}

		const claimsObserver = new IntersectionObserver(
			(entries) => {
				if (
					entries[0].isIntersecting
					&& hasMoreClaims()
				) {
					getClaims();
				}
			},
			{
				threshold,
			}
		);

		if (claimsSentinelRef) {
			claimsObserver.observe(claimsSentinelRef);
		}

		onCleanup(() => {
			activitiesObserver.disconnect();
			claimsObserver.disconnect();
		});
	});

	const LoadingIndicator: Component = () => (
		<>
			<Separator class="my-6" />
			<div class="flex flex-col gap-2 items-center">
				<Spinner variant="primary" />
				Hämtar
			</div>
		</>
	);

	const ShowingCount: Component<{ count: number, total: number }> = (props) => (
		<>
			<div class="flex items-center gap-4 ml-2 text-sm text-muted-foreground">
				<Button
					onClick={toggleSort}
					variant="ghost"
					size="icon"
				>
					{
						sort() === "-"
							?
							<Icon icon={Icons.SORT_DESCENDING} />
							:
							<Icon icon={Icons.SORT_ASCENDING} />
					}
				</Button>

				<Show
					when={props.count < props.total}
					fallback={
						<div>
							Visar alla ({props.total})
						</div>
					}
				>
					<div>
						Visar {props.count} av {props.total}
					</div>
				</Show>
			</div>
			<Separator class="my-4" />
		</>
	);

	return (
		<>
			<nav class="py-8">
				<ul class="grid grid-cols-2 md:grid-cols-none md:flex gap-4">
					<li>
						<AddActivity buttonClass="w-full" />
					</li>
					<li>
						<AddClaim buttonClass="w-full" />
					</li>
				</ul>
			</nav>

			<Tabs defaultValue="activities">
				<TabsList class="grid grid-cols-2 md:w-52">
					<TabsTrigger value="activities">Skytte</TabsTrigger>

					<TabsTrigger value="claims">Fordringar</TabsTrigger>
				</TabsList>

				<TabsContent
					forceMount
					value="activities"
					class="my-8 bg-accent rounded-lg p-4 data-selected:block hidden"
				>
					<Show
						when={activities().length}
						fallback={<h2>Inga skytteaktiviteter loggade.</h2>}
					>
						<ShowingCount
							count={activities().length}
							total={activitiesTotal()}
						/>
					</Show>

					<For each={activities()}>
						{(item, index) => (
							<ActivityItem
								{...item}
								isLast={activities().length === index() + 1}
							/>
						)}
					</For>

					<div ref={activitiesSentinelRef} class="h-1" />

					<Show when={loadingActivities()}>
						<LoadingIndicator />
					</Show>
				</TabsContent>

				<TabsContent
					forceMount
					value="claims"
					class="my-8 bg-accent rounded-lg p-4 data-selected:block hidden"
				>
					<Show
						when={claims().length}
						fallback={
							<h2>
								Inga fordringar sparade.
							</h2>
						}
					>
						<ShowingCount
							count={claims().length}
							total={claimsTotal()}
						/>
					</Show>

					<For each={claims()}>
						{(item, index) => (
							<ClaimItem
								{...item}
								isLast={claims().length === index() + 1}
							/>
						)}
					</For>

					<div ref={claimsSentinelRef} class="h-1" />

					<Show when={loadingClaims()}>
						<LoadingIndicator />
					</Show>
				</TabsContent>
			</Tabs>
		</>
	);
}

export default ActivitiesPage;
