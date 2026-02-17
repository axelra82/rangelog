import { ActivityCollectionItem } from "~/types";
import {
	Avatar,
	AvatarFallback,
	Badge,
	Button,
	Separator,
} from "~/components";
import { activities } from "infrastructure";
import { Component, createSignal, Show } from "solid-js";
import { useStore } from "~/store";
import { getInitials } from "~/utilities";
import { ActivityDetailDialog } from "./dialog";

interface ActivityItemProps extends ActivityCollectionItem {
	isLast: boolean;
}

export const ActivityItem: Component<ActivityItemProps> = (props) => {
	const { activities: storeActivities, activitiesSet, weapons } = useStore();
	const [showDeleteDialog, showDeleteDialogSet] = createSignal(false);
	const [showDetailsDialog, showDetailsDialogSet] = createSignal(false);

	const handleDelete = () => {
		activities.delete(props.id);
		showDeleteDialogSet(false);
		activitiesSet((prev) => {
			const currentIndex = storeActivities().findIndex((item) => item.id === props.id);
			if (currentIndex !== -1) {
				prev.splice(currentIndex, 1);
			}
			return prev;
		});
	};

	const getWeaponName = (weaponId: string) => {
		const weapon = weapons().find((w) => w.id === weaponId);
		return weapon ? `${weapon.name} (${weapon.caliber})` : weaponId;
	};

	return (
		<>
			<ActivityDetailDialog
				state={showDetailsDialog}
				stateSet={showDetailsDialogSet}
			/>
			<section class="grid grid-cols-4 gap-2 items-center">
				<div class="col-span-1 flex flex-col items-center">
					<div class="text-5xl font-bold text-foreground">
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
				<div class="col-span-3 flex items-start">
					<div class="flex items-center gap-2">
						<Show when={props.club} keyed>
							{(club) => (
								<Avatar>
									<AvatarFallback>
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
					<div class="ml-auto">
						<Button
							size="sm"
							variant="default"
							onClick={() => showDetailsDialogSet(true)}
						>
							Detaljer
						</Button>
					</div>
				</div>
			</section>
			<Show when={!props.isLast}>
				<Separator class="my-4" />
			</Show>
		</>
	);
};

{/* <Button
onClick={() => showDeleteDialogSet(true)}
>
Radera
</Button> */}

{/* Edit Dialog */ }
{/* <Dialog
open={showDetailsDialog()}
onClose={() => showDetailsDialogSet(false)}
maxWidth="sm"
fullWidth
>
<DialogContent>
<ManageActivityForm
modal
editActivity={props}
onSuccess={() => showDetailsDialogSet(false)}
/>
</DialogContent>
</Dialog> */}

{/* Delete Confirmation Dialog */ }
{/* <Dialog open={showDeleteDialog()}>
<DialogTitle>Radera aktivitet?</DialogTitle>
<DialogContent>
Är du säker på att du vill radera denna aktivitet? Detta kan inte ångras.
</DialogContent>
<Button onClick={() => showDeleteDialogSet(false)}>Avbryt</Button>
<Button onClick={handleDelete}>
Radera
</Button>
</Dialog> */}
