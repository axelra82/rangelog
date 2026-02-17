import { Accessor, Component, Setter } from "solid-js";
import { Dialog, DialogContent, ManageActivityForm } from "~/components";

interface ActivityDetailDialogProps {
	state: Accessor<boolean>;
	stateSet: Setter<boolean>;
}

export const ActivityDetailDialog: Component<ActivityDetailDialogProps> = (props) => {

	return (
		<Dialog
			open={props.state()}
			onOpenChange={props.stateSet}
		>
			<DialogContent>
				<ManageActivityForm modal />
			</DialogContent>
		</Dialog>
	);
}
