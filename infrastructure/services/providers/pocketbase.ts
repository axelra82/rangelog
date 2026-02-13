import { ProviderFunction } from "@/types/data-provider";

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
