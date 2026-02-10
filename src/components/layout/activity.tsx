import { AlertDialogue, ButtonContained } from "..";

import { createSignal } from "solid-js";

import AddIcon from "@suid/icons-material/Add";

import { Severity } from "@/types";

export const AddActivity = () => {
	const [show, showSet] = createSignal(false);

	const open = () => {
		showSet((prev) => !prev);
	}

	return (
		<>
			<ButtonContained
				size="large"
				color="success"
				onClick={() => open()}
			>
				<AddIcon fontSize="small" /> Aktivitet
			</ButtonContained>
			<AlertDialogue
				state={show()}
				title="Logga aktivitet"
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
				severity={Severity.SUCCESS}
			/>
		</>
	);
}
