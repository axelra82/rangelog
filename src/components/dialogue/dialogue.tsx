import { Severity } from "@/types";
import { severityColor } from "@/utilities";
import {
	Dialog as MaterialDialog,
	Box,
	DialogTitle,
	DialogContent,
	DialogContentText,
} from "@suid/material";
import { Accessor, JSX, ParentComponent, Setter, Show } from "solid-js";

interface DialogueProps {
	severity?: Severity;
	state: Accessor<boolean>;
	stateSet: Setter<boolean>;
	title?: string | JSX.Element;
}

export const Dialogue: ParentComponent<DialogueProps> = (props) => (
	<MaterialDialog
		open={typeof props.state === "function" ? props.state() : false}
		onClose={() => props.stateSet(false)}
		maxWidth="sm"
		fullWidth
	>
		<Show when={props.title}>
			<Box
				sx={{
					px: 3,
					py: 2,
					bgcolor: severityColor(props.severity ?? Severity.INFO),
					color: "common.white",
				}}
			>
				<DialogTitle sx={{
					p: 0,
					fontWeight: 600,
				}}>
					{props.title}
				</DialogTitle>
			</Box>
		</Show>

		<DialogContent sx={{ pt: 2 }}>
			<DialogContentText>
				{props.children}
			</DialogContentText>
		</DialogContent>
	</MaterialDialog>
);
