import "./styles/index.css";

import { ParentComponent } from "solid-js";

import { Toaster } from "./components";
import {
	LayoutMainContent,
	LayoutMainMenu,
} from "./components/layout";

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
