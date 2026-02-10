import { Button } from "@suid/material";
import { ParentComponent } from "solid-js";
import { SharedButtonOptions } from ".";

interface ButtonOutlinedProps extends SharedButtonOptions { }

export const ButtonText: ParentComponent<ButtonOutlinedProps> = (props) => {

	const {
		children,
		...options
	} = props;

	return (
		<Button
			variant="text"
			{...options}
		>
			{children}
		</Button>
	);
}
