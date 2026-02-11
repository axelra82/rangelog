import { Button } from "@suid/material";
import { ParentComponent } from "solid-js";
import { SharedButtonOptions } from ".";
import { ConditionalWrapper } from "../conditional-wrapper";
import { A } from "@solidjs/router";

interface ButtonOutlinedProps extends SharedButtonOptions { }

export const ButtonContained: ParentComponent<ButtonOutlinedProps> = (props) => {

	const {
		children,
		...rest
	} = props;

	const {
		route,
		...options
	} = rest;

	route

	return (
		<ConditionalWrapper
			condition={typeof route === "string"}
			wrapper={(wrapperChildren) => <A href={route!}>{wrapperChildren}</A>}
		>
			<Button
				variant="contained"
				{...options}
			>
				{children}
			</Button>
		</ConditionalWrapper>
	);
}
