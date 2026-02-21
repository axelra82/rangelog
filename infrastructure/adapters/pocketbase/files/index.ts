import {
	FileCollectionItem,
} from "~/types";
import { pb } from "..";

export const pocketbaseGetFileUrl = async (
	record: FileCollectionItem
): Promise<string> => {

	const token = await pb.files.getToken();
	const url = pb.files.getURL(record, record.source, { token });

	return url;
};
