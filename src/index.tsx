import { auth as authApi } from "infrastructure";
import { render } from "solid-js/web";

import { AuthChecker } from "./components/auth-checker";
import {
	StoreContextProvider,
} from "./store";

if (!window.location.pathname.startsWith("/_/") && !window.location.pathname.startsWith("/api/")) {
	authApi.refresh();

	render(
		() => (
			<StoreContextProvider>
				<AuthChecker />
			</StoreContextProvider>
		),
		document.getElementById("root") as HTMLElement,
	);
}
