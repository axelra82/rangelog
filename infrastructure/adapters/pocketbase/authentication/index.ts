import { Collections } from "@/types";
import { pb } from "../";

export const pocketbaseAuthCheck = () => {
	const validAuthUser = pb.authStore.isValid;

	if (!validAuthUser) {
		throw Error("The user is not authenticated");
	}
};

export const pocketbaseSignIn = async (props: { username: string; password: string }) => {
	const {
		username,
		password,
	} = props;

	await pb.collection(Collections.USERS).authWithPassword(
		username,
		password,
	);
};

export const pocketbaseSignOut = () => {
	pb.authStore.clear();
};
