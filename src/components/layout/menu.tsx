import { Divider } from "@suid/material";
import {
	ParentComponent,
} from "solid-js";
import { ButtonText } from "../button";
import { A } from "@solidjs/router";
import { Avatar } from "../avatar";
import { useStore } from "@/store";

export const LayoutMainMenu: ParentComponent = () => {
	const store = useStore();

	return (
		<aside>
			<nav class="p-4 flex">
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
				<Avatar name={store.user()?.email} />
			</nav>
			<Divider />
		</aside>
	);
};
