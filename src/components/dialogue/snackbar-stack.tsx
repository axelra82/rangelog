// SnackbarStack.tsx
import { For, createSignal } from "solid-js";
import Portal from "@suid/material/Portal";
import Stack from "@suid/material/Stack";
import { Snackbar } from "./snackbar";
import { Severity } from "~/types";

type Snack = {
	id: number;
	message: string;
	severity?: Severity;
	autoHideDuration?: number;
};

const [snacks, setSnacks] = createSignal<Snack[]>([]);

let idCounter = 0;

export function pushSnackbar(snack: Omit<Snack, "id">) {
	setSnacks((prev) => [
		...prev,
		{ ...snack, id: ++idCounter },
	]);
}

export function SnackbarStack() {
	const remove = (id: number) => {
		setSnacks((prev) => prev.filter((s) => s.id !== id));
	};

	return (
		<Portal>
			<Stack
				spacing={1}
				sx={{
					position: "fixed",
					bottom: "24px",
					left: "24px",
					zIndex: 1400,
					pointerEvents: "none",
				}}
			>
				<For each={snacks()}>
					{(snack) => (
						<div style={{ "pointer-events": "auto" }}>
							<Snackbar
								open
								message={snack.message}
								severity={snack.severity}
								autoHideDuration={snack.autoHideDuration}
								onClose={() => remove(snack.id)}
							/>
						</div>
					)}
				</For>
			</Stack>
		</Portal>
	);
}
