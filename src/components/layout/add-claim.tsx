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
				variant="default"
				size="lg"
				class="w-full bg-orange-400 hover:bg-orange-500"
			>
				<IconPlus />
				Fordring
			</DialogTrigger>
			<DialogContent>
				<>TBD</>
			</DialogContent>
		</Dialog>
	);
};
