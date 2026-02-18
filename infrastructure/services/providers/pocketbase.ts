import { ProviderFunction } from "~/types/service-provider";

import {
	pocketbaseCreateCollectionItem,
	pocketbaseReadCollectionItem,
	pocketbaseUpdateCollectionItem,
	pocketbaseDeleteCollectionItem,
} from "../../adapters/pocketbase/helpers";
import { pocketbaseAuthValidate, pocketbaseLogin, pocketbaseLogout } from "infrastructure/adapters/pocketbase/authentication";
import { pocketbaseDeleteActivityWeaponsByActivity } from "infrastructure/adapters/pocketbase/activitiesWeapon";
import { Collections } from "~/types";

export const createPocketbaseProvider = (): ProviderFunction => ({
	activities: {
		create: (data) => pocketbaseCreateCollectionItem(
			data,
			Collections.ACTIVITIES,
		),
		read: (data) => pocketbaseReadCollectionItem(
			data,
			Collections.ACTIVITIES,
		),
		update: (
			id,
			data,
		) => pocketbaseUpdateCollectionItem(
			id,
			data,
			Collections.ACTIVITIES,
		),
		delete: (id) => pocketbaseDeleteCollectionItem(
			id,
			Collections.ACTIVITIES,
		),
	},
	activitiesWeapons: {
		create: (data) => pocketbaseCreateCollectionItem(
			data,
			Collections.ACTIVITIES_WEAPONS,
		),
		read: (data) => pocketbaseReadCollectionItem(
			data,
			Collections.ACTIVITIES_WEAPONS,
		),
		update: (
			id,
			data,
		) => pocketbaseUpdateCollectionItem(
			id,
			data,
			Collections.ACTIVITIES_WEAPONS,
		),
		delete: (id) => pocketbaseDeleteCollectionItem(
			id,
			Collections.ACTIVITIES_WEAPONS,
		),
		deleteByActivity: (activityId) => pocketbaseDeleteActivityWeaponsByActivity(activityId),
	},
	claims: {
		create: (data) => pocketbaseCreateCollectionItem(
			data,
			Collections.CLAIMS,
		),
		read: (data) => pocketbaseReadCollectionItem(
			data,
			Collections.CLAIMS,
		),
		update: (
			id,
			data,
		) => pocketbaseUpdateCollectionItem(
			id,
			data,
			Collections.CLAIMS,
		),
		delete: (id) => pocketbaseDeleteCollectionItem(
			id,
			Collections.CLAIMS,
		),
	},
	auth: {
		validate: pocketbaseAuthValidate,
		login: (props) => pocketbaseLogin(props),
		logout: pocketbaseLogout,
	},
	weapons: {
		create: (data) => pocketbaseCreateCollectionItem(
			data,
			Collections.WEAPONS,
		),
		read: (data) => pocketbaseReadCollectionItem(
			data,
			Collections.WEAPONS,
		),
		update: (
			id,
			data,
		) => pocketbaseUpdateCollectionItem(
			id,
			data,
			Collections.WEAPONS,
		),
		delete: (id) => pocketbaseDeleteCollectionItem(
			id,
			Collections.WEAPONS,
		),
	}
});
