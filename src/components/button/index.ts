export interface SharedButtonOptions {
	color?: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning";
	size?: "large" | "medium" | "small";
	onClick?: () => void;
}
export { ButtonOutlined } from "./outlined";
export { ButtonContained } from "./contained";
export { ButtonText } from "./text";
