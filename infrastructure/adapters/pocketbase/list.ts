import { Collections, pb } from "./";
import { RecordModel } from "pocketbase";

const list = async <T = RecordModel>(
	collection: Collections,
	options?: Record<string, string>,
) => {
	const records = await pb.collection<T>(collection).getFullList(options);
	return records;
}

export const listActivities = await list(Collections.ACTIVITIES);
export const listClaims = await list(Collections.CLAIMS);
export const listWeapons = await list(Collections.WEAPONS);

// , {
// 	[PocketbaseQueryParam.EXPAND]: SOME_PARAMETER_TO_EXPAND,
// }
