import { createSignal } from "solid-js";
import { IconPlus } from "@tabler/icons-solidjs";
import { Button } from "~/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogTrigger,
} from "~/components/ui/dialog";
import { ManageActivityForm } from "../activities";

export const AddActivity = () => {
	const [open, setOpen] = createSignal(false);

	return (
		<Dialog open={open()} onOpenChange={setOpen}>
			<DialogTrigger as={Button} variant="default" size="lg" class="w-full bg-green-600 hover:bg-green-700">
				<IconPlus class="mr-2 size-4" />
				LOGGA AKTIVITET
			</DialogTrigger>
			<DialogContent>
				<ManageActivityForm modal />
			</DialogContent>
		</Dialog>
	);
};
// import { ButtonContained, Dialogue } from "..";

// import { createSignal } from "solid-js";

// import AddIcon from "@suid/icons-material/Add";

// import { Severity } from "~/types";
// import { DefaultThemePaletteColor } from "~/types/theme";
// import { ManageActivityForm } from "../activities";

// export const AddActivity = () => {
// 	const [show, showSet] = createSignal<boolean>(false);

// 	const open = () => {
// 		showSet((prev) => !prev);
// 	}

// 	return (
// 		<>
// 			<ButtonContained
// 				size="large"
// 				color={DefaultThemePaletteColor.SUCCESS}
// 				onClick={() => open()}
// 				fullWidth
// 			>
// 				<AddIcon fontSize="small" /> Aktivitet
// 			</ButtonContained>
// 			<Dialogue
// 				state={show}
// 				stateSet={showSet}
// 				severity={Severity.SUCCESS}
// 			>
// 				<ManageActivityForm modal />
// 			</Dialogue>
// 		</>
// 	);
// }
