import {
	Collections,
	ReadListRequest,
	ReadListResponse,
	ReadSingleOptions,
} from "~/types";
import { pb } from ".";

export const pocketbaseCreateCollectionItem = async <T>(
	data: { [key: string]: any; } | FormData | undefined,
	collection?: Collections,
): Promise<T> => {
	if (!collection) {
		throw Error("Missing collection for create");
	}

	const record = await pb
		.collection(collection)
		.create<T>(data);

	return record;
};

export const pocketbaseReadCollectionItem = async <T>(
	options: ReadSingleOptions | ReadListRequest,
	collection?: Collections,
): Promise<T | ReadListResponse<T>> => {
	if (!collection) {
		throw Error("Missing collection for read");
	}

	// SINGLE RECORD
	if ("id" in options) {
		const singleItem = await pb
			.collection(collection)
			.getOne<T>(options.id);

		return singleItem;
	}

	// LIST MODE
	const {
		expand,
		filter,
		page = 1,
		perPage = 30,
		sort,
	} = options;

	const result = await pb
		.collection(collection)
		.getList<T>(
			page,
			perPage,
			{
				expand,
				filter,
				sort,
			},
		);

	return {
		items: result.items,
		page: result.page,
		totalPages: result.totalPages,
		totalItems: result.totalItems,
	};
};

export const pocketbaseUpdateCollectionItem = async <T>(
	id: string,
	data: any,
	collection?: Collections,
): Promise<T> => {
	if (!collection) {
		throw Error("Missing collection for update");
	}

	const record = await pb
		.collection(collection)
		.update<T>(id, data);

	return record;
};

export const pocketbaseDeleteCollectionItem = async (
	id: string,
	collection?: Collections,
): Promise<boolean> => {
	if (!collection) {
		throw Error("Missing collection for delete");
	}

	await pb
		.collection(collection)
		.delete(id);

	return true;
};
