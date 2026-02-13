import { AlertDialogue, ButtonContained, Dialogue } from "..";

import { createSignal } from "solid-js";

import AddIcon from "@suid/icons-material/Add";

import { Severity } from "@/types";
import { ManageWeaponForm } from "../weapons";

export const AddWeapon = () => {
	const [show, showSet] = createSignal(false);

	const open = () => {
		showSet((prev) => !prev);
	}

	return (
		<>
			<ButtonContained
				size="large"
				onClick={() => open()}
				fullWidth
			>
				<AddIcon fontSize="small" /> Vapen
			</ButtonContained>
			<Dialogue
				state={show}
				stateSet={showSet}
				severity={Severity.INFO}
			>
				<ManageWeaponForm modal />
			</Dialogue>
		</>
	);
}
