import {
	ActivityWeaponEntry,
	Collections,
} from "~/types";
import { pb } from "..";

export const pocketbaseDeleteActivityWeaponsByActivity = async (
	activityId: string
): Promise<boolean> => {
	const entries = await pb
		.collection(Collections.ACTIVITIES_WEAPONS)
		.getFullList<ActivityWeaponEntry>({
			filter: `activity = "${activityId}"`,
		});

	for (const entry of entries) {
		await pb.collection(Collections.ACTIVITIES_WEAPONS).delete(entry.id);
	}

	return true;
};
