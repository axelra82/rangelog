import { IconPlus } from "@tabler/icons-solidjs";
import { Component, createSignal } from "solid-js";
import {
	Button,
	ClaimsForm,
	Dialog,
	DialogContent,
	DialogTrigger,
	Icon,
} from "~/components";
import { Icons } from "~/types";

interface AddClaimProps {
	buttonClass?: string;
}

export const AddClaim: Component<AddClaimProps> = (props) => {
	const [open, openSet] = createSignal(false);

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
				Spara fordran
			</DialogTrigger>
			<DialogContent>
				<ClaimsForm
					modal
					modalControl={openSet}
				/>
			</DialogContent>
		</Dialog>
	)
};
