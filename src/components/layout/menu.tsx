import { ParentComponent } from "solid-js";
import { A } from "@solidjs/router";
import { useStore } from "~/store";
import { ProfileMenu } from "./profile-menu";
import { Button } from "~/components/ui/button";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { DropdownMenu, DropdownMenuTrigger } from "../ui/dropdown-menu";

export const LayoutMainMenu: ParentComponent = () => {
	const { user } = useStore();

	const getInitials = (email?: string) => {
		if (!email) return "?";
		return email.substring(0, 2).toUpperCase();
	};

	return (
		<>
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
								<AvatarFallback>{getInitials(user()?.email)}</AvatarFallback>
							</Avatar>
							<span class="sr-only">Toggle theme</span>
						</DropdownMenuTrigger>

						<ProfileMenu />
					</DropdownMenu>
				</nav>
			</aside>

		</>
	);
};
