import "@suid/material/Button";
import "@suid/material/styles";

export enum DefaultThemePaletteColor {
	INHERIT = "inherit",
	PRIMARY = "primary",
	SECONDARY = "secondary",
	SUCCESS = "success",
	ERROR = "error",
	INFO = "info",
	WARNING = "warning",
}

export enum CustomThemePaletteColor {
	SALMON = "salmon",
	OCHRE = "ochre",
}

export interface CustomThemePaletteColorProps {
	main: string;
	light: string;
	dark: string;
	contrastText: string;
}

declare module "@suid/material/Button" {
	interface ButtonPropsColorOverrides {
		[CustomThemePaletteColor.SALMON]: true;
		[CustomThemePaletteColor.OCHRE]: true;
	}
}

declare module "@suid/material/styles" {

	interface Palette {
		[CustomThemePaletteColor.SALMON]: CustomThemePaletteColorProps;
		[CustomThemePaletteColor.OCHRE]: CustomThemePaletteColorProps;
	}

	interface PaletteOptions {
		[CustomThemePaletteColor.SALMON]?: CustomThemePaletteColorProps;
		[CustomThemePaletteColor.OCHRE]?: CustomThemePaletteColorProps;
	}
}
