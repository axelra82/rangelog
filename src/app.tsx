import "./styles/index.css";

import { SnackbarStack } from "./components/dialogue/snackbar-stack";
import {
	LayoutMainContent,
	LayoutMainMenu
} from "./components/layout";
import { ParentComponent } from "solid-js";

export const App: ParentComponent = (props) => {

	return (
		<>
			<div class="flex h-screen flex-col">
				<LayoutMainMenu />
				<LayoutMainContent>
					{props.children}
				</LayoutMainContent>
			</div>
			<SnackbarStack />
		</>
	)
};
