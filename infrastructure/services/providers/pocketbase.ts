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
			(raw) => normalizeActivity(raw, pocketbaseActivitySchema),
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
			(raw) => normalizeActivity(raw, pocketbaseActivitySchema),
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
			(raw) => normalizeActivityWeapon(raw, pocketbaseActivityWeaponSchema),
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
			(raw) => normalizeActivityWeapon(raw, pocketbaseActivityWeaponSchema),
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
			(raw) => normalizeClaim(raw, pocketbaseClaimSchema),
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
			(raw) => normalizeClaim(raw, pocketbaseClaimSchema),
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
			(raw) => normalizeAppFile(raw, pocketbaseAppFileSchema),
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
			(raw) => normalizeAppFile(raw, pocketbaseAppFileSchema),
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
			(raw) => normalizeUser(raw, pocketbaseUserSchema),
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
			(raw) => normalizeUser(raw, pocketbaseUserSchema),
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
			(raw) => normalizeWeapon(raw, pocketbaseWeaponSchema),
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
			(raw) => normalizeWeapon(raw, pocketbaseWeaponSchema),
		),
		delete: (id) => pocketbaseDeleteCollectionItem(
			id,
			Collections.WEAPONS,
		),
	}
});
