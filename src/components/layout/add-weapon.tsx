import { AlertDialogue, ButtonContained } from "..";

import { createSignal } from "solid-js";

import AddIcon from "@suid/icons-material/Add";

import { Severity } from "@/types";
import { CreateWeaponForm } from "../weapons";

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
			<AlertDialogue
				state={show}
				stateSet={showSet}
				title={<span class="text-slate-900">Lägg till vapen</span>}
				message={
					<CreateWeaponForm />
				}
				severity={Severity.INFO}
			/>
		</>
	);
}
