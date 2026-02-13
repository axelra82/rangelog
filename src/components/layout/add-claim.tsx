import { ButtonContained, Dialogue } from "..";

import { createSignal } from "solid-js";

import AddIcon from "@suid/icons-material/Add";

import { Severity } from "~/types";
import { DefaultThemePaletteColor } from "~/types/theme";

export const AddClaim = () => {
	const [show, showSet] = createSignal(false);

	const open = () => {
		showSet((prev) => !prev);
	}

	return (
		<>
			<ButtonContained
				size="large"
				color={DefaultThemePaletteColor.WARNING}
				onClick={() => open()}
				fullWidth
			>
				<AddIcon fontSize="small" /> Fordring
			</ButtonContained>
			<Dialogue
				state={show}
				stateSet={showSet}
				severity={Severity.WARNING}
			>
				<>
					<h3>
						Some data.
					</h3>
					<div>
						other options <strong>that can be bold</strong>.
					</div>
				</>
			</Dialogue>
		</>
	);
}
