import { createSignal } from "solid-js";
import { IconPlus } from "@tabler/icons-solidjs";
import {
	Button,
	Dialog,
	DialogContent,
	DialogTrigger,
	ManageActivityForm,
} from "~/components";

export const AddActivity = () => {
	const [open, setOpen] = createSignal(false);

	return (
		<Dialog open={open()} onOpenChange={setOpen}>
			<DialogTrigger
				as={Button}
				variant="default"
				size="lg"
				class="w-full bg-green-600 hover:bg-green-700"
			>
				<IconPlus />
				Lägg till skytte
			</DialogTrigger>
			<DialogContent>
				<ManageActivityForm modal />
			</DialogContent>
		</Dialog>
	);
};
