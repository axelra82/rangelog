import { createMemo } from "solid-js";
import { dashboardRoutes } from "~/routes";
import { A, useLocation } from "@solidjs/router";
import { cn } from "~/utilities";
import { Icon } from "~/components";
import { Icons } from "~/types";

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
				return Icons.CLIPBOARD_DATA_FILLED;

			case "weapons":
				return Icons.BOOK_FILLED;

			case "profile":
				return Icons.USER_FILLED;

			default:
				return Icons.HOME_FILLED;
		}
	};

	const tabs = dashboardRoutes.reduce(
		(acc: { icon: Icons, path: string, label: string }[], route) => {
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
				<div class="bg-background/60 backdrop-blur-xl rounded-full shadow-lg border border-border/85 p-1">
					<nav class="flex items-center justify-evenly">
						{tabs.map((tab) => {
							const isCurrentPath = currentRoute() === tab.path;

							return (
								<A href={tab.path}>
									<button
										class={cn(
											"relative px-5 flex flex-col items-center justify-center gap-1 py-1 rounded-full transition-all duration-200 active:scale-95",
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
											<Icon
												icon={tab.icon}
												class="size-6"
											/>
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
