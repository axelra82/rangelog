import { createSignal } from "solid-js";
import { IconPlus } from "@tabler/icons-solidjs";
import {
	Button,
	Dialog,
	DialogContent,
	DialogTrigger,
	ManageActivityForm,
} from "~/components";

export const AddActivity = () => (
	<Dialog>
		<DialogTrigger
			as={Button}
			variant="success"
			size="lg"
			class="w-full"
		>
			<IconPlus />
			Lägg till skytte
		</DialogTrigger>
		<DialogContent>
			<ManageActivityForm modal />
		</DialogContent>
	</Dialog>
);
