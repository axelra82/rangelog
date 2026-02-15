import { onMount } from "solid-js";
import {
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
} from "~/components";
import { useStore } from "~/store";

const ProfilePage = () => {
	const {
		user
	} = useStore();

	return (
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
			</CardContent>

			<Separator />

			<CardFooter class="pt-4">
				<p>Konto skapat: {user().created}</p>
			</CardFooter>
		</Card>

	);
};

export default ProfilePage;
