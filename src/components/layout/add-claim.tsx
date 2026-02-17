import { createSignal } from "solid-js";
import { IconPlus } from "@tabler/icons-solidjs";
import {
	Button,
	Dialog,
	DialogContent,
	DialogTrigger,
} from "~/components";

export const AddClaim = () => {
	const [open, setOpen] = createSignal(false);

	return (
		<Dialog open={open()} onOpenChange={setOpen}>
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
				<>TBD</>
			</DialogContent>
		</Dialog>
	);
};
