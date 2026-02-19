import { Component, createSignal } from "solid-js";
import { IconPlus } from "@tabler/icons-solidjs";
import {
	Button,
	Dialog,
	DialogContent,
	DialogTrigger,
	Icon,
	WeaponForm,
} from "~/components";
import { Icons } from "~/types";

interface AddWeaponProps {
	buttonClass?: string;
}

export const AddWeapon: Component<AddWeaponProps> = (props) => {
	const [open, setOpen] = createSignal(false);

	return (
		<Dialog open={open()} onOpenChange={setOpen}>
			<DialogTrigger
				as={Button}
				variant="info"
				{...props.buttonClass && { class: props.buttonClass }}
			>
				<Icon icon={Icons.PLUS} />
				Lägg till vapen
			</DialogTrigger>
			<DialogContent>
				<WeaponForm modal modalControl={setOpen} />
			</DialogContent>
		</Dialog>
	);
};
