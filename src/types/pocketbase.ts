import { Calibers, Federations } from "~/data";
import { WeaponTypes } from "~/data/weapon-types";

export enum Collections {
	ACTIVITIES = "activities",
	ACTIVITIES_WEAPONS = "activity_weapons", // Add this
	CLAIMS = "claims",
	USERS = "users",
	WEAPONS = "weapons",
}

export enum PocketbaseQueryParam {
	EXPAND = "expand",
	FIELDS = "fields",
	FILTER = "filter",
	PAGE = "page",
	PER_PAGE = "perPage",
	SKIP_TOTAL = "skipTotal",
	SORT = "sort",
}

export interface ReadSingleOptions {
	id: string;
}

export interface ReadListRequest {
	expand?: string;
	filter?: string;
	page?: number;
	perPage?: number;
	sort?: string;
}

export interface ReadListResponse<T> {
	items: T[];
	page: number;
	totalItems: number;
	totalPages: number;
}

export interface WeaponCollectionItem {
	barrelLength?: string;
	brand: string;
	caliber: Calibers[];
	classification?: string;
	created: string;
	federation: Federations;
	id: string;
	licenseEnd?: string;
	licenseStart?: string;
	model: string;
	name: string;
	notes?: string;
	owner: string;
	serialNumber?: string;
	type: WeaponTypes;
	updated: string;
}

export type WeaponCreateInput = Omit<
	WeaponCollectionItem,
	"id" | "created" | "updated"
>;

export type WeaponUpdateInput = Partial<WeaponCreateInput>;

// Activity types
export interface ActivityCollectionItem {
	club?: string;
	created: string;
	date: string;
	exercises?: string;
	expand?: {
		"activity_weapons(activity)": ActivityWeaponEntry[];
	};
	id: string;
	location?: string;
	notes?: string;
	owner: string;
	rangeMaster?: string;
	updated: string;
}

export type ActivityCreateInput = Omit<
	ActivityCollectionItem,
	"id" | "created" | "updated"
>;

export interface ActivityWeaponEntry {
	activity: string;
	caliber?: Calibers;
	id: string;
	rounds?: number;
	weapon: string;
}

export interface ActivityWeaponCreateInput {
	activity: string;
	caliber?: Calibers;
	rounds?: number;
	weapon: string;
}

export interface ShootingEntry {
	caliber?: Calibers;
	rounds?: number;
	weapon: string;
}

export interface ClaimCollectionItem {
	club?: string;
	created: string;
	date: string;
	federation?: Federations;
	id: string;
	location?: string;
	notes?: string;
	owner: string;
	rangeMaster?: string;
	type: string;
	updated: string;
}

export type ClaimCreateInput = Omit<
	ClaimCollectionItem,
	"id" | "created" | "updated"
>;
