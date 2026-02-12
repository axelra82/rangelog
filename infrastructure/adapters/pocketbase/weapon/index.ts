import {
	Collections,
	ReadListRequest,
	ReadListResponse,
	ReadSingleOptions,
	WeaponCollectionItem,
	WeaponCreateInput,
	WeaponUpdateInput,
} from "@/types";
import { pb } from "..";

export const pocketbaseCreateWeaponCollectionItem = async (
	data: WeaponCreateInput
): Promise<WeaponCollectionItem> => {
	const record = await pb
		.collection(Collections.WEAPONS)
		.create<WeaponCollectionItem>(data);

	return record;
};

export const pocketbaseReadWeaponCollectionItem = async (
	options: ReadSingleOptions | ReadListRequest
): Promise<WeaponCollectionItem | ReadListResponse<WeaponCollectionItem>> => {

	// SINGLE RECORD
	if ("id" in options) {
		const singleItem = await pb
			.collection(Collections.WEAPONS)
			.getOne<WeaponCollectionItem>(options.id);

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
		.collection(Collections.WEAPONS)
		.getList<WeaponCollectionItem>(page, perPage, {
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

export const pocketbaseUpdateWeaponCollectionItem = async (
	id: string,
	data: WeaponUpdateInput
): Promise<WeaponCollectionItem> => {
	const record = await pb
		.collection(Collections.WEAPONS)
		.update<WeaponCollectionItem>(id, data);

	return record;
};

export const pocketbaseDeleteWeaponCollectionItem = async (
	id: string
): Promise<boolean> => {
	await pb
		.collection(Collections.WEAPONS)
		.delete(id);

	return true;
};
