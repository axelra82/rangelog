import {
	Weapon,
} from "~/schemas";

import {
	NormalizerSchema,
} from "~/types";

export const pocketbaseWeaponSchema: NormalizerSchema<Weapon> = {
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
	seller: {},
	sellerUrl: {},
	serialNumber: {},
	type: {},
	updated: {},
};
