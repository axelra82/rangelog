import { IconLogout } from "@tabler/icons-solidjs";
import { auth } from "infrastructure";
import { Show } from "solid-js";
import {
	AppDetails,
	Button,
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
	Separator,
	TextField,
	TextFieldInput,
	TextFieldLabel,
	ThemeSelect,
} from "~/components";
import { useStore } from "~/store";

const ProfilePage = () => {
	const {
		user,
		isAuthenticatedSet,
		isMobile,
	} = useStore();

	const handleLogout = () => {
		const done = auth.logout();
		if (done) {
			isAuthenticatedSet(false);
		}
	};

	return (
		<>
			<Card>
				<CardHeader>
					<CardTitle>
						Profilinformation
					</CardTitle>
					<CardDescription>Hantera din profiluppgifter</CardDescription>
				</CardHeader>

				<Separator />

				<CardContent class="py-8">
					<ul class="flex flex-col gap-4 max-w-2xs">
						<li>
							<TextField value={user().name}>
								<TextFieldLabel class="text-sm font-medium">
									Namn
								</TextFieldLabel>
								<TextFieldInput type="text" />
							</TextField>
						</li>
						<li>
							<TextField value={user().email}>
								<TextFieldLabel class="text-sm font-medium">
									E-post
								</TextFieldLabel>
								<TextFieldInput type="text" />
							</TextField>
						</li>
					</ul>

					<p class="mt-4 text-sm text-foreground">
						Konto skapat: {user().created}
					</p>
				</CardContent>

				<Separator />

				<CardFooter class="pt-5">
					<AppDetails />
				</CardFooter>
			</Card>

			<Show when={isMobile()}>
				<section class="mt-8 px-4 flex justify-between items-center">
					<ThemeSelect />
					<Button size="lg" onClick={handleLogout}>
						<IconLogout />
						Logga ut
					</Button>
				</section>
			</Show>
		</>
	);
};

export default ProfilePage;
