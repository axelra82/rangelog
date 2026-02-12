import { TextField, Button, Box, Paper, Typography } from "@suid/material";
import { auth } from "../../infrastructure/services";
import { Component, createSignal } from "solid-js";
import { useStore } from "@/store";

export const LoginPage: Component = () => {
	const store = useStore();

	const [email, setEmail] = createSignal("");
	const [password, setPassword] = createSignal("");

	const handleLogin = async () => {
		const authUser = await auth.login({
			username: email(),
			password: password(),
		});

		if (authUser) {
			store.userSet(authUser);
			store.isAuthenticatedSet(true);
		}

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
