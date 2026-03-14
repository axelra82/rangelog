import { Component, createSignal } from "solid-js";

import {
	Button,
	Dialog,
	DialogContent,
	DialogTrigger,
	Icon,
	WeaponForm,
} from "~/components";
import { Icons } from "~/types";
import { t } from "~/utilities";

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
				{t("add")}
				{" "}
				{t("weapon")}
			</DialogTrigger>
			<DialogContent>
				<WeaponForm modal modalControl={setOpen} />
			</DialogContent>
		</Dialog>
	);
};
