import { render } from "solid-js/web";

import {
	StoreContextProvider,
} from "./store";
import { AuthChecker } from "./components/auth-checker";
import { auth as authApi } from "infrastructure";

if (!window.location.pathname.startsWith("/_/")) {
	authApi.refresh();

	render(
		() => (
			<StoreContextProvider>
				<AuthChecker />
			</StoreContextProvider>
		),
		document.getElementById("root") as HTMLElement
	);
}
