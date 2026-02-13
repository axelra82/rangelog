import {
	ActivityWeaponEntry,
	ActivityWeaponCreateInput,
	Collections,
	ReadListRequest,
	ReadListResponse,
	ReadSingleOptions,
} from "@/types";
import { pb } from "..";

export const pocketbaseCreateActivityWeaponCollectionItem = async (
	data: ActivityWeaponCreateInput
): Promise<ActivityWeaponEntry> => {
	const record = await pb
		.collection(Collections.ACTIVITIES_WEAPONS)
		.create<ActivityWeaponEntry>(data);

	return record;
};

export const pocketbaseReadActivityWeaponCollectionItem = async (
	options: ReadSingleOptions | ReadListRequest
): Promise<ActivityWeaponEntry | ReadListResponse<ActivityWeaponEntry>> => {

	// SINGLE RECORD
	if ("id" in options) {
		const singleItem = await pb
			.collection(Collections.ACTIVITIES_WEAPONS)
			.getOne<ActivityWeaponEntry>(options.id);

		return singleItem;
	}

	// LIST MODE
	const {
		page = 1,
		perPage = 30,
		filter,
		sort,
	} = options;

	const result = await pb
		.collection(Collections.ACTIVITIES_WEAPONS)
		.getList<ActivityWeaponEntry>(page, perPage, {
			filter,
			sort,
		});

	return {
		items: result.items,
		page: result.page,
		totalPages: result.totalPages,
		totalItems: result.totalItems,
	};
};

export const pocketbaseUpdateActivityWeaponCollectionItem = async (
	id: string,
	data: Partial<ActivityWeaponCreateInput>
): Promise<ActivityWeaponEntry> => {
	const record = await pb
		.collection(Collections.ACTIVITIES_WEAPONS)
		.update<ActivityWeaponEntry>(id, data);

	return record;
};

export const pocketbaseDeleteActivityWeaponCollectionItem = async (
	id: string
): Promise<boolean> => {
	await pb
		.collection(Collections.ACTIVITIES_WEAPONS)
		.delete(id);

	return true;
};

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
