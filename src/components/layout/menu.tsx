import { Divider } from "@suid/material";
import {
	ParentComponent,
} from "solid-js";
import { ButtonText } from "../button";
import { A } from "@solidjs/router";

export const LayoutMainMenu: ParentComponent = () => {

	return (
		<aside>
			<nav class="p-4">
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
			</nav>
			<Divider />
		</aside>
	);
};
