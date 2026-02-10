import "./styles/index.css";

import { SnackbarStack } from "./components/dialogue/snackbar-stack";
import { LayoutBottomBar, LayoutMainContent, LayoutMainMenu } from "./components/layout";
import { Accessor, ParentComponent, Setter } from "solid-js";
import { ColorMode } from "./types";

interface AppProps {
	colorMode: Accessor<ColorMode>;
	setColorMode: Setter<ColorMode>;
}

export const App: ParentComponent<AppProps> = (props) => {
	return (
		<>
			<div class="flex h-screen flex-col grow">
				<LayoutMainMenu />
				<LayoutMainContent>
					{props.children}
				</LayoutMainContent>

				<LayoutBottomBar {...props} />
			</div>
			<SnackbarStack />
		</>
	)
};
