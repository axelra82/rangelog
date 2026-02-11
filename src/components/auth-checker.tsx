import { App } from "../app";
import { dashboardRoutes } from "@/routes";
import { useStore } from "@/store";
import { ColorMode } from "@/types";
import { Router } from "@solidjs/router";
import { LoginPage } from "@/pages/login";
import { ThemeProvider, createTheme, CssBaseline } from "@suid/material";
import { Show } from "solid-js";

export const AuthChecker = () => {
	const store = useStore();

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
		<Show when={store.isAuthenticated()} fallback={<LoginPage />}>
			<ThemeProvider theme={() => createTheme({
				palette: {
					mode: resolveMode(store.colorMode()),
				},
			})}>
				<CssBaseline />
				<Router root={(props) => <App {...props} />}>
					{dashboardRoutes}
				</Router>
			</ThemeProvider>
		</Show>
	);
};
