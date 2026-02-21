import { createEffect, createMemo, ParentComponent, Show } from "solid-js";
import { A, useLocation } from "@solidjs/router";
import {
	Avatar,
	AvatarFallback,
	BottomNavTabBars,
	Button,
	DropdownMenu,
	DropdownMenuTrigger,
	ProfileMenu,
} from "~/components";
import { useStore } from "~/store";
import { getInitials } from "~/utilities";

export const LayoutMainMenu: ParentComponent = () => {
	const {
		user,
		isMobile
	} = useStore();

	const router = useLocation();

	const currentRoute = createMemo(() => {
		const path = router.pathname.split("/")[1];
		return `/${path}`;
	});

	const activeState = (route: string) => currentRoute() === route ? "default" : "ghost";

	return (
		<Show
			when={isMobile()}
			fallback={
				<aside class="border-b border-b-border">
					<nav class="p-2 flex justify-between items-center max-w-4xl mx-auto">
						<ul class="flex gap-2">
							<li>
								<Button
									as={A}
									href="/"
									variant={activeState("/")}
								// variant="default"
								>
									Dashboard
								</Button>
							</li>
							<li>
								<Button
									as={A}
									href="/activities"
									variant={activeState("/activities")}
								>
									Aktiviteter
								</Button>
							</li>
							<li>
								<Button
									as={A}
									href="/weapons"
									variant={activeState("/weapons")}
								>
									Vapen
								</Button>
							</li>
						</ul>
						<DropdownMenu>
							<DropdownMenuTrigger
								as={Button<"button">}
								variant="ghost"
								size="icon"
								class="rounded-full"
							>
								<Avatar>
									<AvatarFallback>
										{getInitials(user()?.email)}
									</AvatarFallback>
								</Avatar>
								<span class="sr-only">Toggle theme</span>
							</DropdownMenuTrigger>

							<ProfileMenu />
						</DropdownMenu>
					</nav>
				</aside>
			}
		>
			<BottomNavTabBars />
		</Show>
	);
};
