import { IconPlus } from "@tabler/icons-solidjs";
import { createSignal } from "solid-js";
import {
	ActivityForm,
	Button,
	Dialog,
	DialogContent,
	DialogTrigger,
} from "~/components";

export const AddActivity = () => {
	const [open, openSet] = createSignal(false);

	return (
		<Dialog
			open={open()}
			onOpenChange={openSet}
		>
			<DialogTrigger
				as={Button}
				variant="success"
				size="lg"
				class="w-full"
			>
				<IconPlus />
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
