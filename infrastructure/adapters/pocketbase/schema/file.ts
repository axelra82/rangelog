import {
	AppFile,
} from "~/schemas";

import {
	NormalizerSchema,
} from "~/types";

export const pocketbaseAppFileSchema: NormalizerSchema<AppFile> = {
	created: {},
	id: {},
	name: {},
	owner: {},
	size: {},
	source: {},
	type: {},
};
