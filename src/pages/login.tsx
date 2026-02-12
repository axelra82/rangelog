import { TextField, Button, Box, Paper, Typography } from "@suid/material";
import { pb } from "../../infrastructure/adapters/pocketbase";
import { Component, createSignal } from "solid-js";

export const LoginPage: Component = () => {
	const [email, setEmail] = createSignal("");
	const [password, setPassword] = createSignal("");

	const handleLogin = async () => {
		await pb.collection("users").authWithPassword(email(), password());
	};

	return (
		<Box sx={{
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			minHeight: "100vh",
			bgcolor: "background.default"
		}}>
			<Paper sx={{ p: 4, width: "100%", maxWidth: 400 }}>
				<Typography variant="h5" sx={{ mb: 3, textAlign: "center" }}>
					Login
				</Typography>
				<Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
					<TextField
						label="Email"
						type="email"
						fullWidth
						value={email()}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<TextField
						label="Password"
						type="password"
						fullWidth
						value={password()}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<Button variant="contained" fullWidth onClick={handleLogin}>
						Login
					</Button>
				</Box>
			</Paper>
		</Box>
	);
}

export default LoginPage;
