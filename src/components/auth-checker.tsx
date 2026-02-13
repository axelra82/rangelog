import { App } from "../app";
import { dashboardRoutes } from "~/routes";
import { useStore } from "~/store";
import { ColorMode, ReadListResponse, WeaponCollectionItem } from "~/types";
import { Router } from "@solidjs/router";
import { LoginPage } from "~/pages/login";
import { ThemeProvider, createTheme, CssBaseline } from "@suid/material";
import { createEffect, createSignal, Match, onMount, Switch } from "solid-js";
import { auth, weapons } from "../../infrastructure/services";
import { FullPageLoader } from "./loader";

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
		const result = await auth.validate();

		if (result.user) {
			userSet(result.user);
			isAuthenticatedSet(true);
		}

		setReady(true);
	});

	createEffect(async () => {
		if (isAuthenticated()) {
			const weaponsData = await weapons.read({}) as ReadListResponse<WeaponCollectionItem>;
			weaponsSet(weaponsData.items);
		}
	});

	const getSystemMode = (): ColorMode.LIGHT | ColorMode.DARK => {
		if (typeof window === "undefined" || !window.matchMedia) {
			return ColorMode.DARK;
		}

		return window.matchMedia("(prefers-color-scheme: dark)").matches
			? ColorMode.DARK
			: ColorMode.LIGHT;
	}

	const resolveMode = (mode: ColorMode): ColorMode.LIGHT | ColorMode.DARK => {
		if (mode === ColorMode.SYSTEM) {
			return getSystemMode();
		}

		return mode;
	}

	return (
		<ThemeProvider
			theme={() =>
				createTheme({
					palette: {
						mode: resolveMode(colorMode()),
						salmon: {
							main: '#fa8072',
							light: '#ffb5a7',
							dark: '#c14f47',
							contrastText: '#000',
						},
						ochre: {
							main: '#E3D026',
							light: '#E9DB5D',
							dark: '#A29415',
							contrastText: '#242105',
						},
					},
				})
			}
		>
			<CssBaseline />
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
		</ThemeProvider>
	);
};
