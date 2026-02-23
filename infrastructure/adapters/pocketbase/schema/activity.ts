import {
	Activity,
} from "~/schemas";

import {
	NormalizerSchema,
} from "~/types";

export const pocketbaseActivitySchema: NormalizerSchema<Activity> = {
	club: {},
	created: {},
	date: {},
	exercises: {},
	expand: {},
	id: {},
	location: {},
	notes: {},
	owner: {},
	rangeMaster: {},
	updated: {},
};
