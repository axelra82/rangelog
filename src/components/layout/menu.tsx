import { ParentComponent, Show } from "solid-js";
import { A } from "@solidjs/router";
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

	return (
		<Show
			when={isMobile()}
			fallback={
				<aside class="border-b border-b-border">
					<nav class="p-2 flex justify-between items-center max-w-4xl mx-auto">
						<ul class="flex gap-2">
							<li>
								<Button variant="ghost" as={A} href="/">
									Dashboard
								</Button>
							</li>
							<li>
								<Button variant="ghost" as={A} href="/activities">
									Aktiviteter
								</Button>
							</li>
							<li>
								<Button variant="ghost" as={A} href="/weapons">
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
