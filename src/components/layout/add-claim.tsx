import { Component, createSignal } from "solid-js";

import {
	Button,
	ClaimsForm,
	Dialog,
	DialogContent,
	DialogTrigger,
	Icon,
} from "~/components";
import { useT } from "~/hooks/useT";
import { Icons } from "~/types";

interface AddClaimProps {
	buttonClass?: string;
}

export const AddClaim: Component<AddClaimProps> = (props) => {
	const [open, openSet] = createSignal(false);
	const t = useT();
	return (
		<Dialog
			open={open()}
			onOpenChange={openSet}
		>
			<DialogTrigger
				as={Button}
				variant="warning"
				{...props.buttonClass && { class: props.buttonClass }}
			>
				<Icon icon={Icons.PLUS} />
				{t("register")}
				{" "}
				{t("claim")}
			</DialogTrigger>
			<DialogContent>
				<ClaimsForm
					modal
					modalControl={openSet}
				/>
			</DialogContent>
		</Dialog>
	);
};
