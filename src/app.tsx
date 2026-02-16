import "./styles/index.css";

import {
	LayoutMainContent,
	LayoutMainMenu
} from "./components/layout";
import { ParentComponent } from "solid-js";
import { Toaster } from "./components";

export const App: ParentComponent = (props) => (
	<>
		<div class="flex h-screen flex-col">
			<LayoutMainMenu />
			<LayoutMainContent>
				{props.children}
			</LayoutMainContent>
		</div>
		<Toaster />
	</>
);
