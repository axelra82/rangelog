import { AppFile } from "~/schemas";
import { Collections, pb } from "..";

export const pocketbaseGetFileUrl = async (
	record: AppFile
): Promise<string> => {
	const token = await pb.files.getToken();
	const url = pb.files.getURL({
		...record,
		collectionName: Collections.FILES,
	}, record.source, { token });

	return url;
};
