import { ProviderFunction } from "@/types/data-provider";

import {
	pocketbaseCreateActivityCollectionItem,
	pocketbaseReadActivityCollectionItem,
	pocketbaseUpdateActivityCollectionItem,
	pocketbaseDeleteActivityCollectionItem,
} from "../../adapters/pocketbase/activities";

import {
	pocketbaseCreateActivityWeaponCollectionItem,
	pocketbaseReadActivityWeaponCollectionItem,
	pocketbaseUpdateActivityWeaponCollectionItem,
	pocketbaseDeleteActivityWeaponCollectionItem,
	pocketbaseDeleteActivityWeaponsByActivity,
} from "../../adapters/pocketbase/activitiesWeapon";

import {
	pocketbaseAuthValidate,
	pocketbaseLogin,
	pocketbaseLogout
} from "../../adapters/pocketbase/authentication";

import {
	pocketbaseCreateWeaponCollectionItem,
	pocketbaseReadWeaponCollectionItem,
	pocketbaseUpdateWeaponCollectionItem,
	pocketbaseDeleteWeaponCollectionItem,
} from "../../adapters/pocketbase/weapons";

export const createPocketbaseProvider = (): ProviderFunction => ({
	activities: {
		create: pocketbaseCreateActivityCollectionItem,
		read: pocketbaseReadActivityCollectionItem,
		update: pocketbaseUpdateActivityCollectionItem,
		delete: pocketbaseDeleteActivityCollectionItem,
	},
	activitiesWeapons: {
		create: pocketbaseCreateActivityWeaponCollectionItem,
		read: pocketbaseReadActivityWeaponCollectionItem,
		update: pocketbaseUpdateActivityWeaponCollectionItem,
		delete: pocketbaseDeleteActivityWeaponCollectionItem,
		deleteByActivity: pocketbaseDeleteActivityWeaponsByActivity,
	},
	auth: {
		validate: pocketbaseAuthValidate,
		login: pocketbaseLogin,
		logout: pocketbaseLogout,
	},
	weapons: {
		create: pocketbaseCreateWeaponCollectionItem,
		read: pocketbaseReadWeaponCollectionItem,
		update: pocketbaseUpdateWeaponCollectionItem,
		delete: pocketbaseDeleteWeaponCollectionItem,
	}
});
