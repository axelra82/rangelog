import {
	Claim,
} from "~/schemas";

import {
	NormalizerSchema,
} from "~/types";

export const pocketbaseClaimSchema: NormalizerSchema<Claim> = {
	club: {},
	created: {},
	date: {},
	federation: {},
	id: {},
	image: {},
	location: {},
	notes: {},
	owner: {},
	rangeMaster: {},
	type: {},
	updated: {},
};
