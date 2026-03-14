import {
	ReadListRequest,
	ReadListResponse,
	ReadSingleOptions,
} from "~/types";

import {
	Collections,
	pb,
} from ".";

export const pocketbaseCreateCollectionItem = async <T>(
	data: Record<string, unknown> | undefined,
	collection: Collections,
	normalize: (data: Record<string, unknown>) => Readonly<T>,
): Promise<T> => {
	const record = await pb
		.collection(collection)
		.create(data);

	return normalize(record);
};

export const pocketbaseReadCollectionItem = async <T>(
	options: ReadSingleOptions | ReadListRequest,
	collection: Collections,
	normalize: (data: Record<string, unknown>) => Readonly<T>,
): Promise<Readonly<T> | ReadListResponse<T>> => {
	// SINGLE RECORD
	if ("id" in options) {
		const singleItem = await pb.collection(collection).getOne(options.id);
		return normalize(singleItem);
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
		.getList(
			page,
			perPage,
			{
				expand,
				filter,
				sort,
			},
		);

	return {
		items: result.items.map(normalize),
		page: result.page,
		totalPages: result.totalPages,
		totalItems: result.totalItems,
	};
};

export const pocketbaseUpdateCollectionItem = async <T>(
	id: string,
	data: Record<string, unknown> | undefined,
	collection: Collections,
	normalize: (data: Record<string, unknown>) => Readonly<T>,
): Promise<T> => {
	const record = await pb
		.collection(collection)
		.update(id, data);

	return normalize(record);
};

export const pocketbaseDeleteCollectionItem = async (
	id: string,
	collection: Collections,
): Promise<boolean> => {
	await pb
		.collection(collection)
		.delete(id);

	return true;
};
