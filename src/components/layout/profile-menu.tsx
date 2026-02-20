import { IconLogout, IconUser } from "@tabler/icons-solidjs";
import { auth } from "infrastructure";
import { Component, Show } from "solid-js";
import { useStore } from "~/store";
import {
	DropdownMenuContent,
	DropdownMenuItem,
	Icon,
	Separator,
	ThemeSelect
} from "~/components/";
import { A } from "@solidjs/router";
import { Icons } from "~/types";

export const ProfileMenu: Component = () => {
	const {
		user,
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
				<ThemeSelect />
			</DropdownMenuItem>

			<Separator />

			<A href="/profile">
				<DropdownMenuItem>
					<div class="flex gap-2 items-center py-2">
						<Icon
							icon={Icons.USER}
							class="size-4"
						/>
						Profil
					</div>
				</DropdownMenuItem>
			</A>

			<Separator />

			<Show when={user().admin}>
				<A href="/admin">
					<DropdownMenuItem>
						<div class="flex gap-2 items-center py-2">
							<Icon
								icon={Icons.SHIELD}
								class="size-4"
							/>
							Admin
						</div>
					</DropdownMenuItem>
				</A>

				<Separator />
			</Show>

			<DropdownMenuItem onSelect={handleLogout}>
				<div class="flex gap-2 items-center py-2">
					<Icon
						icon={Icons.LOGOUT}
						class="size-4"
					/>
					Logga ut
				</div>
			</DropdownMenuItem>
		</DropdownMenuContent>
	);
};
