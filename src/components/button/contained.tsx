import { Button } from "@suid/material";
import { ParentComponent } from "solid-js";
import { SharedButtonOptions } from ".";
import { ConditionalWrapper } from "~/components/conditional-wrapper";
import { A } from "@solidjs/router";

interface ButtonOutlinedProps extends SharedButtonOptions { }

export const ButtonContained: ParentComponent<ButtonOutlinedProps> = (props) => {
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
				variant="contained"
				sx={{
					bgcolor: `${color ?? "primary"}.main`,
					color: `${color ?? "primary"}.contrastText`,
					"&:hover": {
						bgcolor: `${color ?? "primary"}.dark`,
					}
				}}
				{...options}
			>
				{children}
			</Button>
		</ConditionalWrapper>
	);
}
