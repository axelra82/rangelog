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
import { getInitials, getYear } from "~/utilities";
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

	const year = getYear(props.date).year;
	const isCurrentYear = getYear(props.date).isCurrent;

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
				class="flex gap-4 items-center p-2 cursor-pointer"
				onClick={showEditDialogSet}
			>
				<div class="w-14 flex flex-col items-center">
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
					<Show when={!isCurrentYear}>
						<div class="text-xs font-black text-muted-foreground mt-2">
							{year}
						</div>
					</Show>
				</div>

				<div class="flex items-center gap-8">
					<div class="flex flex-col gap-2">
						<Show when={props.club} keyed>
							{(club) => (
								<Avatar class="size-14">
									<AvatarFallback class="bg-accent-foreground/10 text-sky-500 text-xl font-medium">
										{getInitials(club)}
									</AvatarFallback>
								</Avatar>
							)}
						</Show>
						<Show when={props.location} keyed>
							{(location) => (
								<Badge variant="outline-purple" class="mx-auto">
									{location}
								</Badge>
							)}
						</Show>
					</div>

					<div class="flex flex-col gap-4 self-start">
						<Show when={props.rangeMaster} keyed>
							{(rangeMaster) => (
								<Badge class="text-xs mr-auto" variant="outline-teal">
									{rangeMaster}
								</Badge>
							)}
						</Show>

						<div class="flex flex-wrap gap-2">
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
					</div>
				</div>
			</section>
			<Separator
				class="my-4"
				isLast={props.isLast}
			/>
		</>
	);
};
