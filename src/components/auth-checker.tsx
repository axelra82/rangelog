import { Router } from "@solidjs/router";
import {
	auth as authApi,
	weapons as weaponsApi,
} from "infrastructure";
import {
	createEffect,
	createSignal,
	Match,
	onCleanup,
	onMount,
	Switch,
} from "solid-js";
import { registerSW } from "virtual:pwa-register";

import { FullPageLoader } from "~/components";
import { LoginPage } from "~/pages/login";
import { dashboardRoutes } from "~/routes";
import { Weapon } from "~/schemas";
import { useStore } from "~/store";
import {
	ColorMode,
	ReadListResponse,
} from "~/types";

import { App } from "../app";

let swRegistration: ServiceWorkerRegistration | undefined;

registerSW({
	onRegisteredSW(_swUrl, registration) {
		if (!registration) {
			return;
		}

		swRegistration = registration;

		document.addEventListener("visibilitychange", () => {
			if (document.visibilityState === "visible" && !registration.installing) {
				registration.update().catch((error) => console.error(error));
			}
		});
	},
	onNeedRefresh() {
		window.location.reload();
	},
});

const checkForSWUpdate = async () => {
	if (swRegistration && !swRegistration.installing) {
		await swRegistration.update();
	}
};

const SWUpdateOnNavigate = () => {
	createEffect(() => {
		checkForSWUpdate().catch((error) => console.error(error));
	});

	return null;
};

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

	createEffect(() => {
		if (isAuthenticated()) {
			weaponsApi.read({
				expand: "documents",
			}).then((weaponsData) => {
				weaponsSet((weaponsData as ReadListResponse<Weapon>).items);
			}).catch((error) => console.error(error));
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
				<Router root={(props) => (
					<>
						<SWUpdateOnNavigate />
						<App {...props} />
					</>
				)}
				>
					{dashboardRoutes}
				</Router>
			</Match>
		</Switch>
	);
};
