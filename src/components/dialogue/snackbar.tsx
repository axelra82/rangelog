// Snackbar.tsx
import { createEffect, onCleanup } from "solid-js";
import Paper from "@suid/material/Paper";
import Fade from "@suid/material/Fade";
import Alert from "@suid/material/Alert";
import { Severity } from "@/types";

type SnackbarProps = {
	open: boolean;
	message: string;
	severity?: Severity;
	autoHideDuration?: number;
	onClose?: () => void;
};

export function Snackbar(props: SnackbarProps) {
	let timer: number | undefined;

	createEffect(() => {
		if (props.open && props.autoHideDuration) {
			timer = window.setTimeout(() => {
				props.onClose?.();
			}, props.autoHideDuration);
		}
	});

	onCleanup(() => {
		if (timer) clearTimeout(timer);
	});

	return (
		<Fade in={props.open}>
			<Paper elevation={6}>
				<Alert
					severity={props.severity ?? "info"}
					onClose={props.onClose}
				>
					{props.message}
				</Alert>
			</Paper>
		</Fade>
	);
}
