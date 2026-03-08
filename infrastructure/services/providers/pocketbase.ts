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
	pocketbaseActivityParser,
	pocketbaseActivityWeaponParser,
	pocketbaseAppFileParser,
	pocketbaseClaimParser,
	pocketbaseUserParser,
	pocketbaseWeaponParser,
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
			(raw) => normalizeActivity(raw, pocketbaseActivityParser),
		),
		read: (data) => pocketbaseReadCollectionItem(
			data,
			Collections.ACTIVITIES,
			(raw) => normalizeActivity(raw, pocketbaseActivityParser),
		),
		update: (
			id,
			data,
		) => pocketbaseUpdateCollectionItem(
			id,
			data,
			Collections.ACTIVITIES,
			(raw) => normalizeActivity(raw, pocketbaseActivityParser),
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
			(raw) => normalizeActivityWeapon(raw, pocketbaseActivityWeaponParser),
		),
		read: (data) => pocketbaseReadCollectionItem(
			data,
			Collections.ACTIVITIES_WEAPONS,
			(raw) => normalizeActivityWeapon(raw, pocketbaseActivityWeaponParser),
		),
		update: (
			id,
			data,
		) => pocketbaseUpdateCollectionItem(
			id,
			data,
			Collections.ACTIVITIES_WEAPONS,
			(raw) => normalizeActivityWeapon(raw, pocketbaseActivityWeaponParser),
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
			(raw) => normalizeClaim(raw, pocketbaseClaimParser),
		),
		read: (data) => pocketbaseReadCollectionItem(
			data,
			Collections.CLAIMS,
			(raw) => normalizeClaim(raw, pocketbaseClaimParser),
		),
		update: (
			id,
			data,
		) => pocketbaseUpdateCollectionItem(
			id,
			data,
			Collections.CLAIMS,
			(raw) => normalizeClaim(raw, pocketbaseClaimParser),
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
			(raw) => normalizeAppFile(raw, pocketbaseAppFileParser),
		),
		read: (data) => pocketbaseReadCollectionItem(
			data,
			Collections.FILES,
			(raw) => normalizeAppFile(raw, pocketbaseAppFileParser),
		),
		update: (
			id,
			data,
		) => pocketbaseUpdateCollectionItem(
			id,
			data,
			Collections.FILES,
			(raw) => normalizeAppFile(raw, pocketbaseAppFileParser),
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
			(raw) => normalizeUser(raw, pocketbaseUserParser),
		),
		read: (data) => pocketbaseReadCollectionItem(
			data,
			Collections.USERS,
			(raw) => normalizeUser(raw, pocketbaseUserParser),
		),
		update: (
			id,
			data,
		) => pocketbaseUpdateCollectionItem(
			id,
			data,
			Collections.USERS,
			(raw) => normalizeUser(raw, pocketbaseUserParser),
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
			(raw) => normalizeWeapon(raw, pocketbaseWeaponParser),
		),
		read: (data) => pocketbaseReadCollectionItem(
			data,
			Collections.WEAPONS,
			(raw) => normalizeWeapon(raw, pocketbaseWeaponParser),
		),
		update: (
			id,
			data,
		) => pocketbaseUpdateCollectionItem(
			id,
			data,
			Collections.WEAPONS,
			(raw) => normalizeWeapon(raw, pocketbaseWeaponParser),
		),
		delete: (id) => pocketbaseDeleteCollectionItem(
			id,
			Collections.WEAPONS,
		),
	}
});
