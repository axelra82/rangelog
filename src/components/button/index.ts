import { CustomThemePaletteColor, DefaultThemePaletteColor } from "@/types/theme";
import ButtonProps from "@suid/material/Button/ButtonProps";

export interface SharedButtonOptions extends ButtonProps {
	color?: DefaultThemePaletteColor | CustomThemePaletteColor;
	size?: "large" | "medium" | "small";
	onClick?: () => void;
	route?: string;
}

export { ButtonOutlined } from "./outlined";
export { ButtonContained } from "./contained";
export { ButtonText } from "./text";
