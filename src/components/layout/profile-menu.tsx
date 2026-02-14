import { IconLogout } from "@tabler/icons-solidjs";
import { auth } from "infrastructure/services";
import { Component } from "solid-js";
import { useStore } from "~/store";
import { ThemeSelect } from "../theme";
import {
	DropdownMenuContent,
	DropdownMenuItem,
} from "~/components/ui/dropdown-menu";

export const ProfileMenu: Component = () => {
	const {
		isAuthenticatedSet
	} = useStore();

	const handleLogout = () => {
		const done = auth.logout();
		if (done) {
			isAuthenticatedSet(false);
		}
	};

	return (
		<DropdownMenuContent>
			<DropdownMenuItem>
				<div class="p-2">
					<ThemeSelect />
				</div>
			</DropdownMenuItem>
			<DropdownMenuItem onSelect={handleLogout}>
				<IconLogout class="mr-2 size-4" />
				<span>Logout</span>
			</DropdownMenuItem>
		</DropdownMenuContent>
	);
};
