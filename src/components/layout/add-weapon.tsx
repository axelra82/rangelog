import { Component, createSignal } from "solid-js";

import {
	Button,
	Dialog,
	DialogContent,
	DialogTrigger,
	Icon,
	WeaponForm,
} from "~/components";
import { useT } from "~/hooks/useT";
import { Icons } from "~/types";

interface AddWeaponProps {
	buttonClass?: string;
}

export const AddWeapon: Component<AddWeaponProps> = (props) => {
	const [open, setOpen] = createSignal(false);
	const t = useT();

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
