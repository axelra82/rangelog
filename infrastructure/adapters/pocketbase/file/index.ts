// import {
// 	FileBrowserFile,
// 	PocketbaseCollection,
// 	PocketbaseFileEntry,
// } from "@/types";
// import { normalizedFileBrowserObject } from "@/utilities";

// import { pb, pocketbaseFileURL } from "..";

// const localFileURL = (id: string, object: string) => `${pocketbaseFileURL}/${PocketbaseCollection.FILE}/${id}/${object}`;

// export const pocketbaseCreateFile = async (data: Record<string, unknown>[]): Promise<FileBrowserFile[]> => {
// 	const promises = data.map((file) => {
// 		const {
// 			title,
// 			path,
// 		} = file;

// 		const collectionItem = pb.collection<PocketbaseFileEntry>(PocketbaseCollection.FILE).create({
// 			title,
// 			...(typeof path !== "undefined" && { path }),
// 		});

// 		return normalizedFileBrowserObject(collectionItem);
// 		// return collectionItem;
// 	});

// 	const sanitizedFiles = await Promise.all(promises);

// 	// const sanitizedFiles = resolvedPromises.map((file: any) => normalizedFileBrowserObject(file));

// 	// TODO: Return or handle Query?
// 	// .map((file) => localFileURL(file.id, file.objectName));
// 	return sanitizedFiles;
// };

// export const pocketbaseReadFile = async (data: string[]) => {
// 	const promises = data.map(async (id) => {
// 		const collection = await pb.collection(PocketbaseCollection.FILE).getOne(id);

// 		return normalizedFileBrowserObject(collection);
// 	});

// 	const sanitizedFiles = await Promise.all(promises);

// 	// const sanitizedFiles = resolvedPromises.map((file: any) => normalizedFileBrowserObject(file));

// 	// TODO: Return or handle Query?
// 	// .map((file) => localFileURL(file.id, file.objectName));
// 	return sanitizedFiles;
// };

// export const pocketbaseUpdateFile = async (data: Record<string, unknown>[]) => {
// 	const promises = data.map(async (item) => {
// 		const collection = await pb.collection(PocketbaseCollection.FILE).update((item.id as string), { ...item });

// 		return normalizedFileBrowserObject(collection);
// 	});

// 	const sanitizedFiles = await Promise.all(promises);

// 	// const sanitizedFiles = resolvedPromises.map((file: any) => normalizedFileBrowserObject(file));

// 	// TODO: Return or handle Query?
// 	return sanitizedFiles.map((file: FileBrowserFile) => localFileURL(file.id, file.objectName));
// };

// export const pocketbaseDeleteFile = async (data: string[]) => {
// 	const promises = data.map(async (id) => pb.collection(PocketbaseCollection.FILE).delete(id));

// 	const resolvedPromises = await Promise.all(promises);
// 	// TODO: Return or handle Query?

// 	return resolvedPromises;
// };

// // export const getPocketbaseObject = async (data: unknown) => {
// // 	const {
// // 		id,
// // 		object,
// // 	} = await pb.collection("file").getOne(data.object as string);

// // 	return `${localFileAPI}/file/${id}/${object}`;
// // };

// export const getPointCloudFile = async (fileId: string) => {
// 	const {
// 		id,
// 		title,
// 		object,
// 		type,
// 	} = await pb.collection("file").getOne(fileId);

// 	return {
// 		id: object,
// 		name: title,
// 		objectName: id,
// 		type,
// 	};
// };
