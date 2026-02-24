import { Component, createSignal } from "solid-js";
import {
	ActivityForm,
	Button,
	Dialog,
	DialogContent,
	DialogTrigger,
	Icon,
} from "~/components";
import { Icons } from "~/types";

interface AddActivityProps {
	buttonClass?: string;
}

export const AddActivity: Component<AddActivityProps> = (props) => {
	const [open, openSet] = createSignal(false);

	return (
		<Dialog
			open={open()}
			onOpenChange={openSet}
		>
			<DialogTrigger
				as={Button}
				variant="success"
				{...props.buttonClass && { class: props.buttonClass }}
			>
				<Icon icon={Icons.PLUS} />
				Logga skytte
			</DialogTrigger>
			<DialogContent>
				<ActivityForm
					modal
					modalControl={openSet}
				/>
			</DialogContent>
		</Dialog>
	)
};
