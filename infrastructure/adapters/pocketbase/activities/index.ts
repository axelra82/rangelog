import {
	ActivityCollectionItem,
	ActivityCreateInput,
	Collections,
	ReadListRequest,
	ReadListResponse,
	ReadSingleOptions,
} from "@/types";
import { pb } from "..";

export const pocketbaseCreateActivityCollectionItem = async (
	data: ActivityCreateInput
): Promise<ActivityCollectionItem> => {
	const record = await pb
		.collection(Collections.ACTIVITIES)
		.create<ActivityCollectionItem>(data);

	return record;
};

export const pocketbaseReadActivityCollectionItem = async (
	options: ReadSingleOptions | ReadListRequest
): Promise<ActivityCollectionItem | ReadListResponse<ActivityCollectionItem>> => {

	// SINGLE RECORD
	if ("id" in options) {
		const singleItem = await pb
			.collection(Collections.ACTIVITIES)
			.getOne<ActivityCollectionItem>(options.id);

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
		.collection(Collections.ACTIVITIES)
		.getList<ActivityCollectionItem>(page, perPage, {
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

export const pocketbaseUpdateActivityCollectionItem = async (
	id: string,
	data: any
): Promise<ActivityCollectionItem> => {
	const record = await pb
		.collection(Collections.ACTIVITIES)
		.update<ActivityCollectionItem>(id, data);

	return record;
};

export const pocketbaseDeleteActivityCollectionItem = async (
	id: string
): Promise<boolean> => {
	await pb
		.collection(Collections.ACTIVITIES)
		.delete(id);

	return true;
};
