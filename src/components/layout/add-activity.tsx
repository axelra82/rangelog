import { ButtonContained, Dialogue } from "..";

import { createSignal } from "solid-js";

import AddIcon from "@suid/icons-material/Add";

import { Severity } from "@/types";
import { DefaultThemePaletteColor } from "@/types/theme";
import { ManageActivityForm } from "../activities";

export const AddActivity = () => {
	const [show, showSet] = createSignal<boolean>(false);

	const open = () => {
		showSet((prev) => !prev);
	}

	return (
		<>
			<ButtonContained
				size="large"
				color={DefaultThemePaletteColor.SUCCESS}
				onClick={() => open()}
				fullWidth
			>
				<AddIcon fontSize="small" /> Aktivitet
			</ButtonContained>
			<Dialogue
				state={show}
				stateSet={showSet}
				severity={Severity.SUCCESS}
			>
				<ManageActivityForm modal />
			</Dialogue>
		</>
	);
}
