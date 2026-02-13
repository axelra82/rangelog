import { ActivityCollectionItem } from "@/types";
import {
	Card,
	CardContent,
	Typography,
	Chip,
	Stack,
	Box,
	Divider,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from "@suid/material";
import { activities } from "../../../infrastructure/services";

import { Component, Show, createSignal, For } from "solid-js";
import { useStore } from "@/store";
import { ManageActivityForm } from "./";

export const ActivityItem: Component<ActivityCollectionItem> = (props) => {
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
		<Card sx={{ marginY: 4 }}>
			<CardContent>
				<Stack spacing={3}>
					{/* Header */}
					<Box>
						<Typography variant="h6" component="div" gutterBottom>
							{new Date(props.date).toLocaleDateString("sv-SE", {
								year: "numeric",
								month: "long",
								day: "numeric",
								hour: "2-digit",
								minute: "2-digit",
							})}
						</Typography>
						<Stack direction="row" spacing={1} sx={{ mb: 1 }}>
							<Show when={props.club}>
								<Chip label={props.club} size="small" color="primary" />
							</Show>
							<Show when={props.location}>
								<Chip label={props.location} size="small" variant="outlined" />
							</Show>
						</Stack>
					</Box>

					<Divider />

					{/* Details */}
					<Stack spacing={1}>
						<Typography variant="body2" color="text.secondary">
							<strong>Skjutledare:</strong> {props.rangeMaster}
						</Typography>

						<Show when={props.weapons && props.weapons.length > 0}>
							<Box>
								<Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
									<strong>Vapen:</strong>
								</Typography>
								<Stack direction="row" spacing={1} flexWrap="wrap">
									<For each={props.weapons}>
										{(weaponId) => (
											<Chip
												label={getWeaponName(weaponId)}
												size="small"
												sx={{
													bgcolor: "salmon.main",
													color: "salmon.contrastText",
												}}
											/>
										)}
									</For>
								</Stack>
							</Box>
						</Show>

						<Show when={props.exercises}>
							<Box>
								<Typography variant="body2" color="text.secondary">
									<strong>Övningar:</strong>
								</Typography>
								<Typography
									variant="body2"
									color="text.secondary"
									sx={{ whiteSpace: "pre-wrap" }}
								>
									{props.exercises}
								</Typography>
							</Box>
						</Show>

						<Show when={props.notes}>
							<Box>
								<Typography variant="body2" color="text.secondary">
									<strong>Anteckningar:</strong>
								</Typography>
								<Typography
									variant="body2"
									color="text.secondary"
									sx={{ whiteSpace: "pre-wrap" }}
								>
									{props.notes}
								</Typography>
							</Box>
						</Show>
					</Stack>

					{/* Action Buttons */}
					<Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end", gap: 1 }}>
						<Button
							variant="outlined"
							color="primary"
							size="small"
							onClick={() => showEditDialogSet(true)}
						>
							Redigera
						</Button>
						<Button
							variant="outlined"
							color="error"
							size="small"
							onClick={() => showDeleteDialogSet(true)}
						>
							Radera
						</Button>
					</Box>

					{/* Edit Dialog */}
					<Dialog
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
					</Dialog>

					{/* Delete Confirmation Dialog */}
					<Dialog open={showDeleteDialog()} onClose={() => showDeleteDialogSet(false)}>
						<DialogTitle>Radera aktivitet?</DialogTitle>
						<DialogContent>
							<DialogContentText>
								Är du säker på att du vill radera denna aktivitet? Detta kan inte ångras.
							</DialogContentText>
						</DialogContent>
						<DialogActions>
							<Button onClick={() => showDeleteDialogSet(false)}>Avbryt</Button>
							<Button onClick={handleDelete} color="error" variant="contained">
								Radera
							</Button>
						</DialogActions>
					</Dialog>
				</Stack>
			</CardContent>
		</Card>
	);
};
