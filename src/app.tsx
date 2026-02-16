import "./styles/index.css";

import {
	LayoutMainContent,
	LayoutMainMenu
} from "./components/layout";
import { ParentComponent } from "solid-js";
import { Toaster } from "./components";
import { cn } from "./utilities";
import { useStore } from "./store";

export const App: ParentComponent = (props) => {
	const {
		isMobile,
	} = useStore();

	return (
		<>
			<div class={cn(
				"flex h-screen flex-col",
				{
					"pb-24": isMobile(),
				}
			)}>
				<LayoutMainMenu />
				<LayoutMainContent>
					{props.children}
				</LayoutMainContent>
			</div>
			<Toaster />
		</>
	)
};
