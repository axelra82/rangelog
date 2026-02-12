import ButtonProps from "@suid/material/Button/ButtonProps";

export interface SharedButtonOptions extends ButtonProps {
	color?: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning";
	size?: "large" | "medium" | "small";
	onClick?: () => void;
	route?: string;
}

export { ButtonOutlined } from "./outlined";
export { ButtonContained } from "./contained";
export { ButtonText } from "./text";
