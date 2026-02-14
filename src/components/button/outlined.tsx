import { Button } from "@suid/material";
import { ParentComponent } from "solid-js";
import { SharedButtonOptions } from ".";
import { A } from "@solidjs/router";
import { ConditionalWrapper } from "~/components/conditional-wrapper";

interface ButtonOutlinedProps extends SharedButtonOptions { }

export const ButtonOutlined: ParentComponent<ButtonOutlinedProps> = (props) => {
	const {
		children,
		...rest
	} = props;

	const {
		route,
		color,
		...options
	} = rest;

	route

	return (
		<ConditionalWrapper
			condition={typeof route === "string"}
			wrapper={(wrapperChildren) => <A href={route!}>{wrapperChildren}</A>}
		>
			<Button
				variant="outlined"
				// sx={{
				// 	bgcolor: `${color ?? "primary"}.main`,
				// 	color: `${color ?? "primary"}.contrastText`
				// }}
				{...options}
			>
				{children}
			</Button>
		</ConditionalWrapper>
	);
}
