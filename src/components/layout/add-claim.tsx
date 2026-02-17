import { IconPlus } from "@tabler/icons-solidjs";
import { createSignal } from "solid-js";
import {
	Button,
	ClaimsForm,
	Dialog,
	DialogContent,
	DialogTrigger,
} from "~/components";

export const AddClaim = () => {
	const [open, openSet] = createSignal(false);

	return (
		<Dialog
			open={open()}
			onOpenChange={openSet}
		>
			<DialogTrigger
				as={Button}
				variant="warning"
				size="lg"
				class="w-full"
			>
				<IconPlus />
				Spara fordring
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
