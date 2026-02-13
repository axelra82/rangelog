import {
	TextField,
	Box,
	Paper,
	Typography,
	CircularProgress,
} from "@suid/material";
import { auth } from "../../infrastructure/services";
import { Component, createSignal, Show } from "solid-js";
import { useStore } from "~/store";
import { ButtonContained } from "~/components";
import { CustomThemePaletteColor, DefaultThemePaletteColor } from "~/types/theme";

export const LoginPage: Component = () => {
	const {
		userSet,
		isAuthenticatedSet,
		working,
		workingSet,
	} = useStore();

	const [email, setEmail] = createSignal("");
	const [password, setPassword] = createSignal("");

	const handleLogin = async () => {
		workingSet(true);
		const authUser = await auth.login({
			username: email(),
			password: password(),
		});

		if (authUser) {
			userSet(authUser);
			isAuthenticatedSet(true);
		}

		workingSet(false);
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
					<ButtonContained
						fullWidth
						onClick={handleLogin}
						disabled={working()}
					>
						<Show
							when={working()}
							fallback="Login"
						>
							<CircularProgress
								sx={{
									color: "primary.contrastText"
								}}
								size={24}
							/>
						</Show>
					</ButtonContained>
				</Box>
			</Paper>
		</Box>
	);
}

export default LoginPage;
