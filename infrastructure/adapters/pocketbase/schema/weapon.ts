import { activities } from "infrastructure/services";
import {
	Weapon,
} from "~/schemas";

import {
	NormalizerSchema,
} from "~/types";

export const pocketbaseWeaponSchema: NormalizerSchema<Weapon> = {
	activities: {},
	barrelLength: {},
	brand: {},
	caliber: {},
	classification: {},
	created: {},
	documents: {},
	expand: {},
	federation: {
		transform: (value) => value === "" ? undefined : value,
	},
	id: {},
	image: {},
	licenseEnd: {},
	licenseStart: {},
	manufacturerUrl: {},
	model: {},
	name: {},
	notes: {},
	owner: {},
	price: {},
	purchaseDate: {},
	rounds: {},
	seller: {},
	sellerUrl: {},
	serialNumber: {},
	type: {},
	updated: {},
};
