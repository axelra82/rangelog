import { render } from "solid-js/web";
import App from "./app";
import { createSignal, createEffect, Accessor } from "solid-js";
import { ColorMode } from "./types";

const STORAGE_KEY = "color-mode";

const savedMode = (localStorage.getItem(STORAGE_KEY) as ColorMode) ?? ColorMode.SYSTEM;

const [mode, setMode] = createSignal<ColorMode>(savedMode);

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

createEffect(() => {
	localStorage.setItem(STORAGE_KEY, mode());
});


if (window.matchMedia) {
	const media = window.matchMedia("(prefers-color-scheme: dark)");
	media.addEventListener("change", () => {
		if (mode() === ColorMode.SYSTEM) {
			setMode(ColorMode.SYSTEM);
		}
	});
}

render(
	() => (
		<ThemeProvider theme={createTheme({
			palette: {
				mode: resolveMode(mode()),
			},
		})}>
			<CssBaseline />
			<App
				colorMode={mode}
				setColorMode={setMode}
			/>
		</ThemeProvider>
	),
	document.getElementById("root") as HTMLElement
);
