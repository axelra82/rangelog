import { createSignal } from "solid-js";
import {
	TextField,
	Button,
	MenuItem,
	Stack,
	Alert,
	Typography,
	CircularProgress,
	Paper,
	FormControl,
	InputLabel,
	Select,
} from "@suid/material";

import { weaponTypes } from "@/data/weapon-types";
import { federations } from "@/data/federations";
import { calibers } from "@/data/calibers";
import { weapon } from "../../../infrastructure/services";
import { todayISODate } from "@/utilities";
import { WeaponCreateInput } from "@/types";
import { useStore } from "@/store";

export const CreateWeaponForm = () => {
	const store = useStore();

	const defaultFormValues = {
		barrelLength: "",
		brand: "",
		caliber: "",
		classification: "",
		federation: "",
		licenseEnd: todayISODate(),
		licenseStart: todayISODate(),
		model: "",
		name: "",
		owner: store.user().id,
		serialNumber: "",
		type: "",
	}

	const [form, setForm] = createSignal<WeaponCreateInput>(defaultFormValues);

	const [loading, setLoading] = createSignal(false);
	const [error, setError] = createSignal<string | null>(null);
	const [success, setSuccess] = createSignal(false);

	const handleChange =
		<K extends keyof WeaponCreateInput>(field: K) =>
			(e: any) => {
				setForm((prev) => ({
					...prev,
					[field]: e.target.value as WeaponCreateInput[K],
				}));
			};

	const resetForm = () => {
		setForm(defaultFormValues);
	};

	const handleSubmit = async (e: Event) => {
		e.preventDefault();
		setError(null);
		setSuccess(false);
		setLoading(true);

		try {
			const current = form();

			if (!current.federation || !current.caliber || !current.type) {
				throw new Error("Please select federation, caliber and type.");
			}

			await weapon.create({
				barrelLength: current.barrelLength,
				brand: current.brand,
				caliber: current.caliber,
				classification: current.classification,
				federation: current.federation,
				licenseEnd: current.licenseEnd || undefined,
				licenseStart: current.licenseStart || undefined,
				model: current.model,
				name: current.name,
				owner: current.owner,
				serialNumber: current.serialNumber,
				type: current.type,
			});

			resetForm();
			setSuccess(true);
		} catch (err: any) {
			setError(err?.message ?? "Something went wrong");
		} finally {
			setLoading(false);
		}
	};

	return (
		<Paper sx={{ p: 4, maxWidth: 700 }}>
			<Typography variant="h5" gutterBottom>
				Create Weapon
			</Typography>

			<form onSubmit={handleSubmit}>
				<Stack spacing={3}>
					{error() && <Alert severity="error">{error()}</Alert>}
					{success() && (
						<Alert severity="success">
							Weapon successfully created
						</Alert>
					)}

					<TextField
						label="Name"
						value={form().name}
						onChange={handleChange("name")}
						required
						fullWidth
					/>

					<TextField
						label="Brand"
						value={form().brand}
						onChange={handleChange("brand")}
						fullWidth
					/>

					<TextField
						label="Model"
						value={form().model}
						onChange={handleChange("model")}
						fullWidth
					/>

					<TextField
						label="Serial Number"
						value={form().serialNumber}
						onChange={handleChange("serialNumber")}
						fullWidth
					/>

					<TextField
						label="Barrel Length"
						value={form().barrelLength}
						onChange={handleChange("barrelLength")}
						fullWidth
					/>

					<TextField
						label="Classification"
						value={form().classification}
						onChange={handleChange("classification")}
						fullWidth
					/>

					<TextField
						label="License Start"
						type="date"
						value={form().licenseStart ?? ""}
						onChange={handleChange("licenseStart")}
						InputLabelProps={{ shrink: true }}
						fullWidth
					/>

					<TextField
						label="License End"
						type="date"
						value={form().licenseEnd}
						onChange={handleChange("licenseEnd")}
						InputLabelProps={{ shrink: true }}
						fullWidth
					/>

					<FormControl fullWidth required>
						<InputLabel id="federation-label">
							Federation
						</InputLabel>

						<Select
							labelId="federation-label"
							value={form().federation ?? ""}
							label="Federation"
							onChange={handleChange("federation")}
						>
							<MenuItem value="" disabled>
								Select federation
							</MenuItem>

							{federations.map((f) => (
								<MenuItem value={f}>{f}</MenuItem>
							))}
						</Select>
					</FormControl>

					<FormControl fullWidth required>
						<InputLabel id="caliber-label">
							Caliber
						</InputLabel>

						<Select
							labelId="caliber-label"
							value={form().caliber ?? ""}
							label="Caliber"
							onChange={handleChange("caliber")}
						>
							<MenuItem value="" disabled>
								Select caliber
							</MenuItem>

							{calibers.map((f) => (
								<MenuItem value={f}>{f}</MenuItem>
							))}
						</Select>
					</FormControl>

					<FormControl fullWidth required>
						<InputLabel id="type-label">
							Type
						</InputLabel>

						<Select
							labelId="type-label"
							value={form().type ?? ""}
							label="Type"
							onChange={handleChange("type")}
						>
							<MenuItem value="" disabled>
								Select type
							</MenuItem>

							{weaponTypes.map((f) => (
								<MenuItem value={f}>{f}</MenuItem>
							))}
						</Select>
					</FormControl>

					<Button
						type="submit"
						variant="contained"
						disabled={loading()}
						size="large"
					>
						{loading() ? <CircularProgress size={24} /> : "Create Weapon"}
					</Button>
				</Stack>
			</form>
		</Paper>
	);
}
