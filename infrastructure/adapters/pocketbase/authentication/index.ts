import { Collections, pb } from "../";
import { ClientUser } from "~/schemas/user";

export const pocketbaseAuthCheck = () => {
	const validAuthUser = pb.authStore.isValid;

	if (!validAuthUser) {
		throw Error("The user is not authenticated");
	}
};

export const pocketbaseLogin = async (props: { username: string; password: string }) => {
	const {
		username,
		password,
	} = props;

	const authUser = await pb.collection(Collections.USERS).authWithPassword<ClientUser>(
		username,
		password,
	);

	return authUser.record;
};

export const pocketbaseLogout = () => {
	pb.authStore.clear();
	return true;
};

export const pocketbaseAuthValidate = async () => {
	pb.autoCancellation(false);

	if (!pb.authStore.isValid) {
		return {
			user: null,
		};
	}

	return {
		user: pb.authStore.record as unknown as ClientUser,
	};
};

export const pocketbaseAuthRefresh = async () => {
	await pb.collection(Collections.USERS).authRefresh();
	pocketbaseAuthValidate();
};
