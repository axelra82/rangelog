import {
	ActivityWeaponEntry,
	Collections,
} from "~/types";
import { pb } from "..";

export const pocketbaseUpdateUserEmail = async (
	newEmail: string
): Promise<boolean> => {
	const entries = await pb
		.collection(Collections.USERS)
		.requestEmailChange(newEmail);

	return entries;
};
