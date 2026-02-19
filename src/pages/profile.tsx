import {
	auth as authApi,
	user as userApi,
} from "infrastructure";
import {
	createSignal,
	Show,
} from "solid-js";
import {
	AppDetails,
	Button,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	Icon,
	Label,
	showToast,
	Spinner,
	TextField,
	TextFieldInput,
	TextFieldLabel,
	ThemeSelect,
} from "~/components";
import { Icons } from "~/types";
import { useStore } from "~/store";
import { isoDateTimeToDateInput } from "~/utilities";

const ProfilePage = () => {
	const {
		user,
		isAuthenticatedSet,
		isMobile,
	} = useStore();

	const [working, workingSet] = createSignal(false);
	const [newUserEmail, newUserEmailSet] = createSignal<string>();
	const [newUserName, newUserNameSet] = createSignal<string>();
	const [newPassword, newPasswordSet] = createSignal<string>();
	const [currentPassword, currentPasswordSet] = createSignal<string>();

	const changeUserName = async (event: Event) => {
		event.preventDefault();
		workingSet(true);

		try {
			const response = await userApi.update(user().id, {
				name: newUserName(),
			});

			if (response) {
				showToast({
					description: "Namn updaterat",
					variant: "success",
					duration: 3000,
				});
			}

			newUserNameSet();
		} catch (error) {
			console.error(error);
			showToast({
				description: "Kunde inte uppdatera namn",
				variant: "error",
				duration: 3000,
			});
		}

		workingSet(false);
	}

	const changeUserEmail = async (event: Event) => {
		event.preventDefault();
		workingSet(true);

		const newEmail = newUserEmail();
		const isNew = newEmail !== user().email;

		if (
			newEmail
			&& isNew
		) {

			try {
				const response = await userApi.updateEmail(newEmail);

				if (response) {
					showToast({
						description: "Se din gamla inkorg för instruktioner",
						variant: "success",
						duration: 3000,
					});
				}

				newUserEmailSet();
			} catch (error) {
				console.error(error);
				showToast({
					description: "Kunde inte ändra epost",
					variant: "error",
					duration: 3000,
				});
			}
		}

		workingSet(false);
	}

	const verifyPassword = (password: string) => {
		if (password.length > 7) {
			console.log("passed");
			newPasswordSet(password);
		} else {
			newPasswordSet();
		}
	}

	const changePassword = async (event: Event) => {
		event.preventDefault();
		workingSet(true);

		if (!currentPassword()) {
			throw Error("Current password can't be empty");
		}

		if (!newPassword()) {
			throw Error("New password can't be empty");
		}

		try {
			const response = await userApi.update(user().id, {
				oldPassword: currentPassword(),
				password: newPassword(),
				passwordConfirm: newPassword(),
			});

			if (response) {
				showToast({
					description: "Lösenord uppdaterades",
					variant: "success",
					duration: 3000,
				});
			}
		} catch (error) {
			console.error(error);
			showToast({
				description: "Kontrollera nuvarande lösenord",
				variant: "error",
				duration: 3000,
			});
		}

		workingSet(false);
	}

	const handleLogout = () => {
		const done = authApi.logout();
		if (done) {
			isAuthenticatedSet(false);
		}
	};

	return (
		<>
			<div class="space-y-8">
				<Card>
					<CardHeader>
						<CardTitle>
							Profilinformation
							<p class="mt-2 text-xs font-light text-muted-foreground">
								Konto skapat: {isoDateTimeToDateInput(user().created)}
							</p>
						</CardTitle>
					</CardHeader>

					<CardContent class="text-sm">
						<form>
							<ul class="flex flex-col text-sm space-y-8 max-w-2xs mb-4">
								<li class="flex flex-col gap-4">
									<TextField>
										<TextFieldLabel>
											Namn
										</TextFieldLabel>
										<TextFieldInput
											value={user().name}
											type="text"
											autocomplete="username"
											onChange={(event) => newUserNameSet(event.target.value)}
										/>
									</TextField>

									<Button
										type="submit"
										variant="info"
										disabled={
											user().name === newUserName()
											|| working()
										}
										onClick={changeUserName}
									>
										<Show
											when={working()}
											fallback="Uppdatera"
										>
											<Spinner class="text-white" />
										</Show>
									</Button>
								</li>

								<li class="flex flex-col gap-4">
									<TextField>
										<TextFieldLabel>
											E-post
										</TextFieldLabel>
										<TextFieldInput
											value={user().email}
											type="email"
											autocomplete="email"
											onChange={(event) => newUserEmailSet(event.target.value)}
										/>
									</TextField>

									<Button
										type="submit"
										variant="info"
										disabled={
											!newUserEmail()
											|| user().email === newUserEmail()
											|| working()
										}
										onClick={changeUserEmail}
									>
										<Show
											when={working()}
											fallback="Ändra"
										>
											<Spinner class="text-white" />
										</Show>
									</Button>
								</li>

								<li class="flex flex-col gap-4">
									<Label>
										Ändra lösenord
									</Label>

									<TextField>
										<TextFieldLabel>
											Nuvarande lösenord
										</TextFieldLabel>
										<TextFieldInput
											type="password"
											autocomplete="current-password"
											onChange={(event) => currentPasswordSet(event.target.value)}
										/>
									</TextField>

									<Show when={currentPassword()}>
										<TextField>
											<TextFieldLabel>
												Nytt lösenord
											</TextFieldLabel>
											<TextFieldInput
												type="password"
												autocomplete="new-password"
												onChange={(event) => verifyPassword(event.target.value)}
											/>
										</TextField>

										<Button
											type="submit"
											variant="success"
											disabled={
												!newPassword()
												|| !currentPassword()
												|| working()
											}
											onClick={changePassword}
										>
											Spara
										</Button>
									</Show>
								</li>
							</ul>
						</form>
					</CardContent>
				</Card>

				<Card class="p-4">
					<AppDetails />
				</Card>
			</div >

			<Show when={isMobile()}>
				<section class="mt-8 px-4 flex justify-between items-center">
					<ThemeSelect />
					<Button size="lg" onClick={handleLogout}>
						<Icon icon={Icons.LOGOUT} />
						Logga ut
					</Button>
				</section>
			</Show>
		</>
	);
};

export default ProfilePage;
