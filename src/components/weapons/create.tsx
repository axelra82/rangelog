import { Component, createSignal } from "solid-js";
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
import { weapons } from "../../../infrastructure/services";
import { todayISODate } from "@/utilities";
import { WeaponCreateInput } from "@/types";
import { useStore } from "@/store";
import { ConditionalWrapper } from "../conditional-wrapper";

interface CreateWeaponFormProps {
	modal?: boolean;
}

export const CreateWeaponForm: Component<CreateWeaponFormProps> = (props) => {
	const {
		user,
		weaponsSet,
	} = useStore();

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
		owner: user().id,
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

	const handleSubmit = async (event: Event) => {
		event.preventDefault();
		setError(null);
		setSuccess(false);
		setLoading(true);

		try {
			const current = form();

			if (!current.federation || !current.caliber || !current.type) {
				throw new Error("Please select federation, caliber and type.");
			}

			const newItem = await weapons.create({
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
			weaponsSet((prev) => [...prev, newItem]);
			setSuccess(true);
		} catch (err: any) {
			setError(err?.message ?? "Something went wrong");
		} finally {
			setLoading(false);
		}
	};

	return (
		<ConditionalWrapper
			condition={!Boolean(props.modal)}
			wrapper={(wrapperChildren) => <Paper sx={{ p: 4 }}>
				{wrapperChildren}
			</Paper>
			}>
			<>
				<Typography variant="h5" gutterBottom>
					Lägg till vapen
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
							label="Namn"
							value={form().name}
							onChange={handleChange("name")}
							required
							fullWidth
						/>

						<FormControl fullWidth required>
							<InputLabel id="type-label">
								Typ
							</InputLabel>

							<Select
								labelId="type-label"
								value={form().type ?? ""}
								label="Type"
								onChange={handleChange("type")}
							>
								<MenuItem value="" disabled>
									Välj typ
								</MenuItem>

								{weaponTypes.map((f) => (
									<MenuItem value={f}>{f}</MenuItem>
								))}
							</Select>
						</FormControl>


						<TextField
							label="Märke"
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

						<FormControl fullWidth required>
							<InputLabel id="caliber-label">
								Kaliber
							</InputLabel>

							<Select
								labelId="caliber-label"
								value={form().caliber ?? ""}
								label="Caliber"
								onChange={handleChange("caliber")}
							>
								<MenuItem value="" disabled>
									Välj kaliber
								</MenuItem>

								{calibers.map((f) => (
									<MenuItem value={f}>{f}</MenuItem>
								))}
							</Select>
						</FormControl>

						<TextField
							label="Serienummer"
							value={form().serialNumber}
							onChange={handleChange("serialNumber")}
							fullWidth
						/>

						<TextField
							label="Piplängd"
							value={form().barrelLength}
							onChange={handleChange("barrelLength")}
							fullWidth
						/>

						<TextField
							label="Klass"
							value={form().classification}
							onChange={handleChange("classification")}
							fullWidth
						/>

						<FormControl fullWidth required>
							<InputLabel id="federation-label">
								Förbund
							</InputLabel>

							<Select
								labelId="federation-label"
								value={form().federation ?? ""}
								label="Federation"
								onChange={handleChange("federation")}
							>
								<MenuItem value="" disabled>
									Välj förbund
								</MenuItem>

								{federations.map((f) => (
									<MenuItem value={f}>{f}</MenuItem>
								))}
							</Select>
						</FormControl>

						<TextField
							label="Licens utfärdat"
							type="date"
							value={form().licenseStart ?? ""}
							onChange={handleChange("licenseStart")}
							InputLabelProps={{ shrink: true }}
							fullWidth
						/>

						<TextField
							label="License upphör"
							type="date"
							value={form().licenseEnd}
							onChange={handleChange("licenseEnd")}
							InputLabelProps={{ shrink: true }}
							fullWidth
						/>

						<Button
							type="submit"
							variant="contained"
							disabled={loading()}
							size="large"
						>
							{loading() ? <CircularProgress size={24} /> : "Lägg till"}
						</Button>
					</Stack>
				</form>
			</>
		</ConditionalWrapper>
	);
}
