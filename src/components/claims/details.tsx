import { ClaimCollectionItem } from "~/types";
import {
	Avatar,
	AvatarFallback,
	Badge,
	Dialog,
	DialogContent,
	ClaimsForm,
	Separator,
} from "~/components";
import {
	Show,
	createSignal,
	Component,
} from "solid-js";
import { getInitials } from "~/utilities";

interface ClaimItemProps extends ClaimCollectionItem {
	isLast: boolean;
}

export const ClaimItem: Component<ClaimItemProps> = (props) => {
	const [showEditDialog, showEditDialogSet] = createSignal(false);

	return (
		<>
			<Dialog
				open={showEditDialog()}
				onOpenChange={showEditDialogSet}
			>
				<DialogContent>
					<ClaimsForm
						modal
						modalControl={showEditDialogSet}
						edit={props}
					/>
				</DialogContent>
			</Dialog>
			<section
				class="grid grid-cols-4 gap-2 items-center p-2 cursor-pointer"
				onClick={showEditDialogSet}
			>
				<div class="col-span-1 flex flex-col items-center">
					<div class="text-3xl font-bold text-foreground">
						{new Date(props.date).toLocaleDateString("sv-SE", {
							day: "numeric",
						})}
					</div>
					<div class="text-sm text-muted-foreground">
						{new Date(props.date).toLocaleDateString("sv-SE", {
							month: "short",
						})}
					</div>
				</div>
				<div class="col-span-3 flex items-start gap-4">
					<Show when={props.club} keyed>
						{(club) => (
							<Avatar class="size-14">
								<AvatarFallback class="bg-accent-foreground/10 text-blue-500 text-xl font-medium">
									{getInitials(club)}
								</AvatarFallback>
							</Avatar>
						)}
					</Show>
					<Show when={props.location} keyed>
						{(location) => (
							<Badge variant="outline-purple">
								{location}
							</Badge>
						)}
					</Show>
				</div>
			</section>
			<Show when={!props.isLast}>
				<Separator class="my-4" />
			</Show>
		</>
	);
};
