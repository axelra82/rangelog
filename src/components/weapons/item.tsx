import { WeaponCollectionItem } from "@/types";
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
import { weapons } from "../../../infrastructure/services";

import {
	Component,
	Show,
	createSignal,
} from "solid-js";
import { useStore } from "@/store";
import { WeaponLicenseExpireWarning } from "./license-expire";
import { ManageWeaponForm } from "./"; // Import the form

export const WeaponItem: Component<WeaponCollectionItem> = (props) => {
	const {
		weapons: storeWeapons,
		weaponsSet,
	} = useStore();
	const [showDeleteDialog, showDeleteDialogSet] = createSignal(false);
	const [showEditDialog, showEditDialogSet] = createSignal(false);

	const handleDelete = () => {
		weapons.delete(props.id);
		showDeleteDialogSet(false);
		weaponsSet((prev) => {
			const currentIndex = storeWeapons().findIndex((item) => item.id === props.id);
			if (currentIndex !== -1) {
				prev.splice(currentIndex, 1);
			}
			return prev;
		});
	};

	return (
		<Card sx={{ marginY: 4 }}>
			<CardContent>
				<Stack spacing={4}>
					{/* Header */}
					<Box>
						<Typography variant="h6" component="div" gutterBottom>
							{props.name}
						</Typography>
						<Stack direction="row" spacing={1} sx={{ mb: 1 }}>
							<Chip
								label={props.type}
								size="small"
								sx={{
									bgcolor: "salmon.main",
									color: "salmon.contrastText"
								}}
							/>
							<Chip
								label={props.caliber}
								size="small"
								sx={{
									bgcolor: "ochre.main",
									color: "ochre.contrastText"
								}}
							/>
							<Chip label={props.federation} variant="outlined" size="small" />
						</Stack>
					</Box>

					<WeaponLicenseExpireWarning
						endDate={props.licenseEnd}
					/>

					<Divider />

					{/* Details */}
					<Stack spacing={1}>
						<Show when={props.brand}>
							<Typography variant="body2" color="text.secondary">
								<strong>Märke:</strong> {props.brand}
							</Typography>
						</Show>

						<Show when={props.model}>
							<Typography variant="body2" color="text.secondary">
								<strong>Model:</strong> {props.model}
							</Typography>
						</Show>

						<Show when={props.serialNumber}>
							<Typography variant="body2" color="text.secondary">
								<strong>Serienummer:</strong> {props.serialNumber}
							</Typography>
						</Show>

						<Show when={props.barrelLength}>
							<Typography variant="body2" color="text.secondary">
								<strong>Piplängd:</strong> {props.barrelLength}
							</Typography>
						</Show>

						<Show when={props.classification}>
							<Typography variant="body2" color="text.secondary">
								<strong>Klass:</strong> {props.classification}
							</Typography>
						</Show>
					</Stack>

					{/* License Dates */}
					<Show when={props.licenseStart || props.licenseEnd}>
						<Box>
							<Divider sx={{ mb: 1 }} />
							<Typography variant="caption" color="text.secondary">
								<Show when={props.licenseStart}>
									Gilltigt från: {new Date(props.licenseStart!).toLocaleDateString()}
								</Show>
								<Show when={props.licenseEnd}>
									{" | "}Utgår: {new Date(props.licenseEnd!).toLocaleDateString()}
								</Show>
							</Typography>
						</Box>
					</Show>

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
							<ManageWeaponForm
								modal
								editWeapon={props}
								onSuccess={() => showEditDialogSet(false)}
							/>
						</DialogContent>
					</Dialog>

					{/* Delete Confirmation Dialog */}
					<Dialog
						open={showDeleteDialog()}
						onClose={() => showDeleteDialogSet(false)}
					>
						<DialogTitle>Radera vapen?</DialogTitle>
						<DialogContent>
							<DialogContentText>
								Är du säker på att du vill radera "{props.name}"? Detta kan inte ångras.
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
}
