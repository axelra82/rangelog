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
