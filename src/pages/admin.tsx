import {
	createSignal,
	For,
	onMount,
	Show,
} from "solid-js";
import {
	ReadListResponse,
	UserCollectionItem,
} from "~/types";
import {
	auth as authApi,
	user as userApi,
} from "infrastructure";
import { ClientUser } from "~/types/user";
import { useNavigate } from "@solidjs/router";
import { Button, Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, Separator, showToast, Spinner } from "~/components";
import { cn, isoDateTimeToDateInput } from "~/utilities";

const AdminPage = () => {
	const navigate = useNavigate();

	const [users, usersSet] = createSignal<ClientUser[]>([]);
	const [workingOn, workingOnSet] = createSignal<string>();

	const getUsers = async () => {
		const data = await userApi.read({
			expand: "activities(id)"
		}) as ReadListResponse<UserCollectionItem>;

		usersSet(data.items as unknown as ClientUser[]);
	}

	onMount(() => {
		authApi.validate()
			.then((response) => {
				if (!response.user?.admin) {
					navigate("/", { replace: true });
				} else {
					getUsers();
				}
			});
	});

	const deleteUser = async (id: string, email: string) => {
		workingOnSet(id);

		try {
			await userApi.delete(id);
			showToast({
				variant: "success",
				description: `${email} (${id}) raderades.`,
				duration: 3000,
			});
		} catch (error) {
			console.error(error);
			showToast({
				variant: "destructive",
				description: `Användare kunde inte raders: ${JSON.stringify(error)}`,
				duration: 3000,
			});
		}

		workingOnSet();
	}

	return (
		<>
			<section class="bg-accent rounded-lg p-8 mt-8 space-y-6">
				<h1>
					User accounts <span class="text-sm text-muted-foreground font-medium">({users().length})</span>
				</h1>
				<Separator />
				<For each={users()}>
					{(user, index) => {
						return (
							<>
								<div class="md:flex gap-2 justify-between items-start">
									<div class={cn(
										"flex flex-col gap-1",
										{
											"pointer-events-none opacity-50": workingOn() === user.id,
										}
									)}>
										<Show when={user.name}>
											<h3>
												{user.name}
											</h3>
										</Show>
										<div>
											<strong>{user.email}</strong>
										</div>
										<div class="text-xs text-muted-foreground">
											{user.id}
										</div>
										<div class="text-xs mt-2">
											created: {isoDateTimeToDateInput(user.created)}
										</div>
									</div>

									<div class="mt-4 md:mt-0">
										<Dialog>
											<DialogTrigger
												as={Button}
												variant="destructive"
												disabled={workingOn() === user.id}
												class="flex gap-4"
											>
												<Show
													when={workingOn() === user.id}
													fallback="Radera"
												>
													Raderar
													<Spinner variant="secondary" />
												</Show>
											</DialogTrigger>
											<DialogContent class="max-w-sm">
												<DialogHeader>
													<DialogTitle>
														Är du säker på att du vill radera {user.email}?
													</DialogTitle>
												</DialogHeader>

												<DialogDescription>
													Detta kommer att ta bort användaren permanent. Denna åtgärd kan inte ångras.
												</DialogDescription>

												<DialogTrigger
													as={Button}
													variant="outline"
												>
													Avbryt
												</DialogTrigger>

												<DialogTrigger
													as={Button}
													variant="destructive"
													onClick={() => deleteUser(user.id, user.email)}
												>
													Fortsätt
												</DialogTrigger>
											</DialogContent>
										</Dialog>
									</div>
								</div>
								<Separator isLast={users().length === index() + 1} />
							</>
						)
					}}
				</For>
			</section>
		</>
	);
}

export default AdminPage;
