import { pb } from "..";

export const pocketbaseOnDisconnect = () => {
	pb.authStore.clear();

	return true;
};

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

	// Sign in with provided credentials
	const authUser = await pb.collection("users").authWithPassword(
		username,
		password,
	);

	if (authUser) {

		console.log("–––––––––––––––––––––––––––");
		console.log("authUser: ", authUser);
	}
};

export const pocketbaseSignOut = () => {
	const response = pocketbaseOnDisconnect();
	if (response) {
		window.location.replace("/");
	}

	return response;
};
