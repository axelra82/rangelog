import {
	createSignal,
	ParentComponent,
} from "solid-js";
import { ButtonText } from "../button";
import { A } from "@solidjs/router";
import { Avatar } from "../avatar";
import { useStore } from "@/store";
import { Divider, IconButton } from "@suid/material";
import { ProfileMenu } from "./profile-menu";

export const LayoutMainMenu: ParentComponent = () => {
	const store = useStore();

	const [anchorEl, anchorElSet] = createSignal<null | HTMLElement>(null);
	const open = () => Boolean(anchorEl());

	return (
		<aside>
			<nav class="p-4 flex justify-between max-w-4xl mx-auto">
				<ul class="flex gap-4">
					<li>
						<ButtonText>
							<A href="/">
								Dashboard
							</A>
						</ButtonText>
					</li>
					<li>
						<ButtonText>
							<A href="/activities">
								Aktiviteter
							</A>
						</ButtonText>
					</li>
					<li>
						<ButtonText>
							<A href="/weapons">
								Vapen
							</A>
						</ButtonText>
					</li>
				</ul>
				<IconButton
					title="Account settings"
					onClick={(event) => anchorElSet(event.currentTarget)}
					size="small"
					sx={{ ml: 2 }}
					aria-controls={open() ? "account-menu" : undefined}
					aria-haspopup="true"
					aria-expanded={open() ? "true" : undefined}
				>
					<Avatar name={store.user()?.email} />
				</IconButton>
				<ProfileMenu
					anchorEl={anchorEl}
					anchorElSet={anchorElSet}
					open={open}
				/>
			</nav>
			<Divider />
		</aside>
	);
};
