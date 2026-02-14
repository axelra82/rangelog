import { createSignal } from "solid-js";
import { IconPlus } from "@tabler/icons-solidjs";
import {
	Button,
	Dialog,
	DialogContent,
	DialogTrigger,
	ManageWeaponForm,
} from "~/components";

export const AddWeapon = () => {
	const [open, setOpen] = createSignal(false);

	return (
		<Dialog open={open()} onOpenChange={setOpen}>
			<DialogTrigger
				as={Button}
				variant="default"
				size="lg"
				class="w-full bg-blue-600 hover:bg-blue-700"
			>
				<IconPlus />
				Lägg till vapen
			</DialogTrigger>
			<DialogContent>
				<ManageWeaponForm modal />
			</DialogContent>
		</Dialog>
	);
};
