import { A } from "@solidjs/router";
import { auth } from "infrastructure";
import { Component, Show } from "solid-js";

import {
	DropdownMenuContent,
	DropdownMenuItem,
	Icon,
	Separator,
	ThemeSelect,
} from "~/components/";
import { useT } from "~/hooks/useT";
import { useStore } from "~/store";
import { Icons } from "~/types";

export const ProfileMenu: Component = () => {
	const {
		user,
		isAuthenticatedSet,
	} = useStore();

	const t = useT();

	const handleLogout = () => {
		const done = auth.logout();
		if (done) {
			isAuthenticatedSet(false);
		}
	};

	return (
		<DropdownMenuContent>
			<div class="p-2">
				<ThemeSelect />
			</div>

			<Separator />

			<A href="/profile">
				<DropdownMenuItem>
					<div class="flex gap-2 items-center py-2">
						<Icon
							icon={Icons.USER}
							class="size-4"
						/>
						{t("profile")}
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
							{t("admin")}
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
					{t("logout")}
				</div>
			</DropdownMenuItem>
		</DropdownMenuContent>
	);
};
