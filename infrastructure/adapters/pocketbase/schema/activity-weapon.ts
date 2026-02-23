import {
	ActivityWeapon,
} from "~/schemas";

import {
	NormalizerSchema,
} from "~/types";

export const pocketbaseActivityWeaponSchema: NormalizerSchema<ActivityWeapon> = {
	activity: {},
	caliber: {},
	id: {},
	rounds: {},
	weapon: {},
};
