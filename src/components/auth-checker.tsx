import { App } from "../app";
import { dashboardRoutes } from "~/routes";
import { useStore } from "~/store";
import {
	ColorMode,
	ReadListResponse,
	WeaponCollectionItem,
} from "~/types";
import { Router } from "@solidjs/router";
import { LoginPage } from "~/pages/login";
import {
	createEffect,
	createSignal,
	Match,
	onCleanup,
	onMount,
	Switch,
} from "solid-js";
import {
	auth as authApi,
	weapons as weaponsApi,
} from "infrastructure";
import { FullPageLoader } from "~/components";

export const AuthChecker = () => {
	const {
		colorMode,
		isAuthenticated,
		isAuthenticatedSet,
		userSet,
		weaponsSet,
	} = useStore();

	const [ready, setReady] = createSignal(false);

	onMount(async () => {
		const result = await authApi.validate();

		if (result.user) {
			userSet(result.user);
			isAuthenticatedSet(true);
		}

		setReady(true);
	});

	createEffect(async () => {
		if (isAuthenticated()) {
			const weaponsData = await weaponsApi.read({}) as ReadListResponse<WeaponCollectionItem>;
			weaponsSet(weaponsData.items);
		}
	});

	createEffect(() => {
		const mode = colorMode();
		const root = document.documentElement;

		const media = window.matchMedia("(prefers-color-scheme: dark)");

		const apply = (isDark: boolean) => {
			root.classList.toggle("dark", isDark);
		};

		if (mode === ColorMode.SYSTEM) {
			apply(media.matches);

			// Optional: react to system changes
			const listener = (e: MediaQueryListEvent) => apply(e.matches);
			media.addEventListener("change", listener);

			onCleanup(() => media.removeEventListener("change", listener));
		} else {
			apply(mode === ColorMode.DARK);
		}
	});

	return (
		<Switch>
			<Match when={!ready()}>
				<FullPageLoader message="working" />
			</Match>

			<Match when={!isAuthenticated()}>
				<LoginPage />
			</Match>

			<Match when={isAuthenticated()}>
				<Router root={(props) => <App {...props} />}>
					{dashboardRoutes}
				</Router>
			</Match>
		</Switch>
	);
};
