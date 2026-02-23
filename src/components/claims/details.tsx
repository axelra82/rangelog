import { Icons } from "~/types";
import {
	Avatar,
	AvatarFallback,
	Badge,
	ClaimsForm,
	Dialog,
	DialogContent,
	Icon,
	Separator,
} from "~/components";
import {
	Component,
	createSignal,
	Match,
	Show,
	Switch,
} from "solid-js";
import { getInitials, getYear } from "~/utilities";
import { Claim } from "~/schemas";

interface ClaimItemProps extends Claim {
	isLast: boolean;
}

export const ClaimItem: Component<ClaimItemProps> = (props) => {
	const [showEditDialog, showEditDialogSet] = createSignal(false);

	const year = getYear(props.date).year;
	const isCurrentYear = getYear(props.date).isCurrent;

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

					<div class="flex flex-col gap-2 items-center">
						<Switch>
							<Match when={Boolean(props.type.includes("Guld"))}>
								<Icon
									icon={Icons.HEXAGON_NUMBER_1_FILLED}
									class="size-12 p-2 rounded-full text-amber-600 bg-amber-100 border-2 border-amber-400"
								/>
							</Match>
							<Match when={Boolean(props.type.includes("Silver"))}>
								<Icon
									icon={Icons.HEXAGON_NUMBER_2_FILLED}
									class="size-12 p-2 rounded-full text-slate-400 bg-slate-200 border-2 border-slate-300"
								/>
							</Match>
							<Match when={Boolean(props.type.includes("Brons"))}>
								<Icon
									icon={Icons.HEXAGON_NUMBER_3_FILLED}
									class="size-12 p-2 rounded-full text-yellow-500 bg-yellow-800 border-2 border-yellow-600"
								/>
							</Match>
						</Switch>
						<div class="text-xs text-center text-muted-foreground">
							{props.type}
						</div>
					</div>

					<Show when={props.rangeMaster} keyed>
						{(rangeMaster) => (
							<Badge class="text-xs mr-auto" variant="outline-teal">
								{rangeMaster}
							</Badge>
						)}
					</Show>
				</div>
			</section>
			<Separator
				class="my-4"
				isLast={props.isLast}
			/>
		</>
	);
};
