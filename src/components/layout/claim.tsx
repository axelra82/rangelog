import { AlertDialogue, ButtonContained } from "..";

import { createSignal } from "solid-js";

import AddIcon from "@suid/icons-material/Add";

import { Severity } from "@/types";

export const AddClaim = () => {
	const [show, showSet] = createSignal(false);

	const open = () => {
		showSet((prev) => !prev);
	}

	return (
		<>
			<ButtonContained
				size="large"
				color="warning"
				onClick={() => open()}
			>
				<AddIcon fontSize="small" /> Fordring
			</ButtonContained>
			<AlertDialogue
				state={show()}
				title="Lägg till fordring"
				message={
					<>
						<h3>
							Some data.
						</h3>
						<div>
							other options <strong>that can be bold</strong>.
						</div>
					</>
				}
				severity={Severity.WARNING}
			/>
		</>
	);
}
