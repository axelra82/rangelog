import { createSignal } from "solid-js";
import { IconPlus } from "@tabler/icons-solidjs";
import {
	Button,
	Dialog,
	DialogContent,
	DialogTrigger,
	WeaponForm,
} from "~/components";

export const AddWeapon = () => {
	const [open, setOpen] = createSignal(false);

	return (
		<Dialog open={open()} onOpenChange={setOpen}>
			<DialogTrigger
				as={Button}
				variant="info"
				size="lg"
				class="w-full"
			>
				<IconPlus />
				Lägg till vapen
			</DialogTrigger>
			<DialogContent>
				<WeaponForm modal />
			</DialogContent>
		</Dialog>
	);
};
