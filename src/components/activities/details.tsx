import { ActivityCollectionItem } from "~/types";
import {
	Avatar,
	AvatarFallback,
	Badge,
	Dialog,
	DialogContent,
	ActivityForm,
	Separator,
} from "~/components";
import {
	Show,
	createSignal,
	Component,
	For,
} from "solid-js";
import { getInitials } from "~/utilities";
import { useStore } from "~/store";

interface ActivityItemProps extends ActivityCollectionItem {
	isLast: boolean;
}

export const ActivityItem: Component<ActivityItemProps> = (props) => {
	const {
		weapons: weaponsStore,
	} = useStore();

	const [showEditDialog, showEditDialogSet] = createSignal(false);
	const weapons = props.expand?.["activity_weapons(activity)"];

	return (
		<>
			<Dialog
				open={showEditDialog()}
				onOpenChange={showEditDialogSet}
			>
				<DialogContent>
					<ActivityForm
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
				<div class="col-span-3 flex items-center flex-wrap gap-4">
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
					<Show when={weapons} keyed>
						{(localWeapons) => (
							<For each={localWeapons}>
								{(item) => {
									const findWeapon = weaponsStore().find((storeItem) => storeItem.id === item.weapon);

									return (
										<Show when={findWeapon} keyed>
											{
												(localWeapon) => (
													<Badge>
														{localWeapon.name}
													</Badge>
												)
											}
										</Show>
									);
								}}
							</For>
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
