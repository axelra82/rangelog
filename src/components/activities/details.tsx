import { ActivityCollectionItem } from "~/types";
import {
	Badge,
	Button,
	Separator,
} from "~/components";
import { activities } from "infrastructure";
import { Component, createSignal, Show } from "solid-js";
import { useStore } from "~/store";

interface ActivityItemProps extends ActivityCollectionItem {
	isLast: boolean;
}

export const ActivityItem: Component<ActivityItemProps> = (props) => {
	const { activities: storeActivities, activitiesSet, weapons } = useStore();
	const [showDeleteDialog, showDeleteDialogSet] = createSignal(false);
	const [showEditDialog, showEditDialogSet] = createSignal(false);

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
			<section class="grid grid-cols-4 gap-2 items-center p-2">
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
					<div class="space-x-3 space-y-2">
						<Show when={props.club}>
							<Badge variant="outline-teal">
								{props.club}
							</Badge>
						</Show>
						<Show when={props.location}>
							<Badge variant="outline-purple">
								{props.location}
							</Badge>
						</Show>
					</div>
					<div class="ml-auto">
						<Button
							size="sm"
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
open={showEditDialog()}
onClose={() => showEditDialogSet(false)}
maxWidth="sm"
fullWidth
>
<DialogContent>
<ManageActivityForm
modal
editActivity={props}
onSuccess={() => showEditDialogSet(false)}
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
