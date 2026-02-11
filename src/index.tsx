import { render } from "solid-js/web";

import {
	StoreContextProvider,
} from "./store";
import { AuthChecker } from "./components/auth-checker";

if (!window.location.pathname.startsWith("/_/")) {
	render(
		() => (
			<StoreContextProvider>
				<AuthChecker />
			</StoreContextProvider>
		),
		document.getElementById("root") as HTMLElement
	);
}
