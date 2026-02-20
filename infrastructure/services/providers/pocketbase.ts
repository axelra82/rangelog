import {
	pocketbaseAuthRefresh,
	pocketbaseAuthValidate,
	pocketbaseCreateCollectionItem,
	pocketbaseDeleteActivityWeaponsByActivity,
	pocketbaseDeleteCollectionItem,
	pocketbaseLogin,
	pocketbaseLogout,
	pocketbaseReadCollectionItem,
	pocketbaseUpdateCollectionItem,
	pocketbaseUpdateUserEmail,
} from "infrastructure/adapters/pocketbase";

import {
	Collections,
	ProviderFunction,
} from "~/types";

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
	auth: {
		login: (props) => pocketbaseLogin(props),
		logout: pocketbaseLogout,
		refresh: pocketbaseAuthRefresh,
		validate: pocketbaseAuthValidate,
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
	user: {
		create: (data) => pocketbaseCreateCollectionItem(
			data,
			Collections.USERS,
		),
		read: (data) => pocketbaseReadCollectionItem(
			data,
			Collections.USERS,
		),
		update: (
			id,
			data,
		) => pocketbaseUpdateCollectionItem(
			id,
			data,
			Collections.USERS,
		),
		updateEmail: (
			newEmail: string,
		) => pocketbaseUpdateUserEmail(
			newEmail,
		),
		delete: (id) => pocketbaseDeleteCollectionItem(
			id,
			Collections.USERS,
		),
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
