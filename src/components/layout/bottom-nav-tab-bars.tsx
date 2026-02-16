import { createMemo } from "solid-js";
import {
	IconHome,
	IconUserCircle,
	IconClipboard,
	IconBook,
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
				return IconClipboard;

			case "weapons":
				return IconBook;

			case "profile":
				return IconUserCircle;

			default:
				return IconHome;
		}
	};

	const tabs = dashboardRoutes.reduce(
		(acc: { icon: typeof IconHome, label: string, path: string }[], route) => {
			const {
				path,
				label,
			} = route;

			const resolvedPath = Array.isArray(path) ? path[0] : path;

			if (paths.includes(resolvedPath)) {
				acc.push({
					icon: pathIcon(resolvedPath),
					label,
					path: `${resolvedPath}`,
				});
			};

			return acc;
		}, []);

	return (
		<div class="fixed bottom-0 left-0 right-0 z-50 px-3 pb-1">
			<div class="bg-white/50 backdrop-blur-2xl rounded-3xl shadow-lg border border-white/20 px-2 py-2">
				<nav class="flex items-center justify-around">
					{tabs.map((tab) => {
						const isCurrentPath = currentRoute() === tab.path;

						return (
							<A href={tab.path}>
								<button
									class={cn(
										"relative flex flex-col items-center justify-center gap-1 py-2 px-3 rounded-full transition-all duration-200 active:scale-95",
									)}
								>
									<div
										class={cn(
											"transition-all duration-200",
											isCurrentPath ? "text-blue-500 scale-105" : "text-gray-500",
										)}
									>
										<tab.icon class="size-5" />
									</div>
									<span
										class={cn(
											"text-xs font-medium transition-all duration-200",
											isCurrentPath ? "text-blue-500" : "text-gray-500",
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
	);
}
