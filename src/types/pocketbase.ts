import { Calibers, Federations } from "@/data";
import { WeaponTypes } from "@/data/weapon-types";

export enum Collections {
	ACTIVITIES = "activities",
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
};

export interface ReadListRequest {
	page?: number;
	perPage?: number;
	filter?: string;
	sort?: string;
};

export interface ReadListResponse<T> {
	items: T[];
	page: number;
	totalPages: number;
	totalItems: number;
};

export interface WeaponCollectionItem {
	barrelLength?: string;
	brand?: string;
	caliber: Calibers;
	classification?: string;
	created: string;
	federation: Federations;
	id: string;
	licenseEnd?: string;
	licenseStart?: string;
	model?: string;
	name: string;
	owner: string;
	serialNumber?: string;
	type: WeaponTypes;
	updated: string;
};

export type WeaponCreateInput = Omit<
	WeaponCollectionItem,
	"id" | "created" | "updated"
>;

export type WeaponUpdateInput = Partial<WeaponCreateInput>;
