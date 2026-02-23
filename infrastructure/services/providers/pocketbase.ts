import {
	pocketbaseAuthRefresh,
	pocketbaseAuthValidate,
	pocketbaseCreateCollectionItem,
	pocketbaseDeleteActivityWeaponsByActivity,
	pocketbaseDeleteCollectionItem,
	pocketbaseGetFileUrl,
	pocketbaseLogin,
	pocketbaseLogout,
	pocketbaseReadCollectionItem,
	pocketbaseUpdateCollectionItem,
	pocketbaseUpdateUserEmail,
	pocketbaseActivitySchema,
	pocketbaseActivityWeaponSchema,
	pocketbaseAppFileSchema,
	pocketbaseClaimSchema,
	pocketbaseUserSchema,
	pocketbaseWeaponSchema,
	Collections,
} from "infrastructure/adapters/pocketbase";

import { ProviderFunction } from "~/types";

import {
	normalizeActivity,
	normalizeActivityWeapon,
	normalizeAppFile,
	normalizeClaim,
	normalizeUser,
	normalizeWeapon,
} from "~/utilities";

export const createPocketbaseProvider = (): ProviderFunction => ({
	activities: {
		create: (data) => pocketbaseCreateCollectionItem(
			data,
			Collections.ACTIVITIES,
		),
		read: (data) => pocketbaseReadCollectionItem(
			data,
			Collections.ACTIVITIES,
			(raw) => normalizeActivity(raw, pocketbaseActivitySchema),
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
			(raw) => normalizeActivityWeapon(raw, pocketbaseActivityWeaponSchema),
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
			(raw) => normalizeClaim(raw, pocketbaseClaimSchema),
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
	file: {
		create: (data) => pocketbaseCreateCollectionItem(
			data,
			Collections.FILES,
		),
		read: (data) => pocketbaseReadCollectionItem(
			data,
			Collections.FILES,
			(raw) => normalizeAppFile(raw, pocketbaseAppFileSchema),
		),
		update: (
			id,
			data,
		) => pocketbaseUpdateCollectionItem(
			id,
			data,
			Collections.FILES,
		),
		delete: (id) => pocketbaseDeleteCollectionItem(
			id,
			Collections.FILES,
		),
		getUrl: (record) => pocketbaseGetFileUrl(record),
	},
	user: {
		create: (data) => pocketbaseCreateCollectionItem(
			data,
			Collections.USERS,
		),
		read: (data) => pocketbaseReadCollectionItem(
			data,
			Collections.USERS,
			(raw) => normalizeUser(raw, pocketbaseUserSchema),
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
			(raw) => normalizeWeapon(raw, pocketbaseWeaponSchema),
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
