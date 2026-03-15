import { auth } from "infrastructure/services";
import {
	Component,
	createSignal,
	Show,
} from "solid-js";

import {
	Button,
	Icon,
	LoginFooter,
	SelectLanguage,
	Spinner,
	TextField,
	TextFieldInput,
	TextFieldLabel,
	ThemeSelect,
} from "~/components";
import { useStore } from "~/store";
import { Icons } from "~/types";
import { t } from "~/utilities";

export const LoginPage: Component = () => {
	const {
		userSet,
		isAuthenticatedSet,
		working,
		workingSet,
	} = useStore();

	const [email, setEmail] = createSignal("");
	const [password, setPassword] = createSignal("");
	const [showPassword, setShowPassword] = createSignal(false);

	const handleLogin = async (event: Event) => {
		event.preventDefault();
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
		<div class="min-h-screen flex flex-col">
			{/* Header with theme selector */}
			<header class="w-full p-4 flex gap-4 justify-end">
				<ThemeSelect />
				<SelectLanguage class="w-auto" />
			</header>

			{/* Main content */}
			<main class="flex-1 flex items-center justify-center p-4">
				<div class="w-full max-w-sm space-y-8 px-4">
					{/* Logo/Brand area */}
					<div class="flex flex-col items-center space-y-2">
						<img
							src="/logo.svg"
							alt="Logo"
							class="w-16 h-16 rounded-2xl"
						/>
						<h1>Rangelog login</h1>
						<p class="text-muted-foreground">Keep track of your range activities and more.</p>
					</div>

					{/* Login card */}

					<form onSubmit={handleLogin} class="space-y-4">
						<div class="space-y-2">
							<TextField
								id="email"
								value={email()}
								onChange={(value) => setEmail(value)}
								disabled={working()}
								required
							>
								<TextFieldLabel>{t("email")}</TextFieldLabel>
								<TextFieldInput
									type="email"
									placeholder="email@example.com"
									autocomplete="email"
								/>
							</TextField>
						</div>
						<div class="space-y-2">
							<TextField
								id="password"
								value={password()}
								onChange={(value) => setPassword(value)}
								disabled={working()}
								required
							>
								<TextFieldLabel>{t("password")}</TextFieldLabel>
								<div class="relative">
									<TextFieldInput
										type={showPassword() ? "text" : "password"}
										placeholder="••••••••"
										autocomplete="current-password"
										class="pr-10"
									/>
									<Button
										type="button"
										variant="ghost"
										size="icon"
										onClick={() => setShowPassword(!showPassword())}
										class="absolute right-0 top-1/2 -translate-y-1/2 h-full"
										tabindex="-1"
										disabled={password() === ""}
									>
										{showPassword()

											? <Icon icon={Icons.EYE_OFF} />
: <Icon icon={Icons.EYE} />}
									</Button>
								</div>
							</TextField>
						</div>
						<Button
							type="submit"
							class="w-full"
							disabled={working()}
							size="lg"
						>
							<Show
								when={working()}
								fallback={t("login")}
							>
								<Spinner variant="secondary" />
							</Show>
						</Button>
					</form>

					<LoginFooter />
				</div>
			</main>
		</div>
	);
};
