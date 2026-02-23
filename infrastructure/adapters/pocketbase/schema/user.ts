import {
	ClientUser,
} from "~/schemas";

import {
	NormalizerSchema,
} from "~/types";

export const pocketbaseUserSchema: NormalizerSchema<ClientUser> = {
	id: {},
	email: {},
	name: {},
	avatar: {},
	claims: {},
	created: {},
	updated: {},
	verified: {},
	admin: {},
	activities: {},
	weapons: {},
};
