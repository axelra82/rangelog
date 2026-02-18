import { createMemo } from "solid-js";
import {
	IconHomeFilled,
	IconUserFilled,
	IconBookFilled,
	IconClipboardDataFilled,
} from "@tabler/icons-solidjs";
import { dashboardRoutes } from "~/routes";
import { A, useLocation } from "@solidjs/router";
import { cn } from "~/utilities";

export const BottomNavTabBars = () => {
	const router = useLocation();

	const currentRoute = createMemo(() => {
		const path = router.pathname.split("/")[1];
		return `/${path}`;
	});

	const paths = [
		"/",
		"/activities",
		"/weapons",
		"/profile",
	];

	const pathIcon = (path: string) => {
		switch (path.split("/")[1].toLowerCase()) {
			case "activities":
				return IconClipboardDataFilled;

			case "weapons":
				return IconBookFilled;

			case "profile":
				return IconUserFilled;

			default:
				return IconHomeFilled;
		}
	};

	const tabs = dashboardRoutes.reduce(
		(acc: { icon: typeof IconHome, path: string, label: string }[], route) => {
			const {
				path,
				label,
			} = route;

			const resolvedPath = Array.isArray(path) ? path[0] : path;

			if (paths.includes(resolvedPath)) {
				acc.push({
					icon: pathIcon(resolvedPath),
					path: `${resolvedPath}`,
     label,
				});
			};

			return acc;
		}, []);

	return (
		<div class="space-y-6">
			<div class="fixed bottom-0 left-0 right-0 z-50 px-5 pb-7">
				<div class="bg-background/60 backdrop-blur-xl rounded-full shadow-lg border border-border/50 py-2 px-1">
					<nav class="flex items-center justify-evenly">
						{tabs.map((tab) => {
							const isCurrentPath = currentRoute() === tab.path;

							return (
								<A href={tab.path}>
									<button
										class={cn(
											"relative px-4 flex flex-col items-center justify-center gap-1 py-2 rounded-full transition-all duration-200 active:scale-95",
											{
												"bg-foreground/10": isCurrentPath,
											},
										)}
									>
										<div
											class={cn(
												"transition-all duration-200",
												isCurrentPath ? "text-sky-500 scale-105" : "text-foreground",
											)}
										>
											<tab.icon class="size-8" />
										</div>
										<span
											class={cn(
												"text-xs font-medium transition-all duration-200",
												isCurrentPath ? "text-sky-500" : "text-gray-500",
											)}
										>
											{tab.label}
										</span>
									</button>
								</A>
							)
						})}
					</nav>
				</div>
			</div>
		</div>
	);
}
