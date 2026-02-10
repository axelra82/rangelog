import { Severity } from "@/types";
import {
	Dialog,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Box,
} from "@suid/material";
import {
	createEffect,
	createSignal,
	JSXElement,
	ParentComponent,
} from "solid-js";

interface AlertDialogProps {
	state: boolean;
	title: string | JSXElement;
	message: string | JSXElement;
	severity?: Severity;
}

const severityColor = (severity: Severity) => ({
	error: "error.main",
	warning: "warning.main",
	info: "info.main",
	success: "success.main",
}[severity]);

export const AlertDialogue: ParentComponent<AlertDialogProps> = (props) => {
	const [open, setOpen] = createSignal(false);

	createEffect(() => {
		setOpen(props.state);
	});

	return (
		<Dialog
			open={open()}
			onClose={() => setOpen(false)}
			maxWidth="sm"
			fullWidth
		>
			{/* Header with severity color */}
			<Box
				sx={{
					px: 3,
					py: 2,
					bgcolor: severityColor(props.severity ?? Severity.INFO),
					color: "common.white",
				}}
			>
				<DialogTitle sx={{ p: 0, fontWeight: 600 }}>
					{props.title}
				</DialogTitle>
			</Box>

			<DialogContent sx={{ pt: 2 }}>
				<DialogContentText>
					{props.message}
				</DialogContentText>
			</DialogContent>
		</Dialog>
	);
};
