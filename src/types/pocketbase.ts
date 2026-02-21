import { Calibers, Federations } from "~/data";
import { WeaponTypes } from "~/data/weapon-types";

export enum Collections {
	ACTIVITIES = "activities",
	ACTIVITIES_WEAPONS = "activity_weapons", // Add this
	CLAIMS = "claims",
	FILES = "files",
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

export interface UserCollectionItem {
	activities: number;
	admin: boolean;
	avatar?: string;
	created: string;
	email: string;
	emailVisibility: boolean;
	id: string;
	name?: string;
	password: string;
	passwordConfirm?: string;
	tokenKey: string;
	updated: string;
	verified: boolean;
	weapons: number;
}

export type UserCreateInput = Pick<
	UserCollectionItem,
	"avatar" | "email" | "emailVisibility" | "name" | "password" | "passwordConfirm"
>;

export type UserUpdateInput = Pick<
	UserCollectionItem,
	"email" | "name" | "password"
>;

export interface FileCollectionItem {
	id: string;
	owner: string;
	name: string;
	source: string;
	size: number;
	type: string;
	created: string;
}

export type FileCreateInput = Omit<
	FileCollectionItem,
	"id" | "created" | "source"
> & {
	source: File;
};

export type FileUpdateInput = Pick<
	FileCollectionItem,
	"name"
>;

export interface WeaponCollectionItem {
	barrelLength?: string;
	brand: string;
	caliber: Calibers[];
	classification?: string;
	created: string;
	documents?: string[];
	expand?: {
		"documents": FileCollectionItem[];
	};
	federation: Federations;
	id: string;
	image?: string;
	licenseEnd?: string;
	licenseStart?: string;
	manufacturerUrl?: string;
	model: string;
	name: string;
	notes?: string;
	owner: string;
	price?: number;
	purchaseDate?: string;
	seller?: string;
	sellerUrl?: string;
	serialNumber?: string;
	type: WeaponTypes;
	updated: string;
}

export type WeaponCreateInput = Omit<
	WeaponCollectionItem,
	"created" | "id" | "updated"
>;

export type WeaponUpdateInput = Partial<WeaponCreateInput>;

// Activity types
export interface ActivityCollectionItem {
	club?: string;
	created: string;
	date: string;
	exercises?: string;
	expand?: {
		"activity_weapons_via_activity": ActivityWeaponEntry[];
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
