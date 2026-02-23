import {
	ActivityCollectionItem,
	ActivityCreateInput,
	ActivityWeaponCollectionItem,
	ActivityWeaponCreateInput,
	ClaimCollectionItem,
	Collections,
	FileCollectionItem,
	FileCreateInput,
	UserCollectionItem,
	UserCreateInput,
	WeaponCollectionItem,
	WeaponCreateInput,
} from "infrastructure/adapters/pocketbase";

import {
	Activity,
	ActivityWeapon,
	AppFile,
	Claim,
	ClaimCreateInput,
	ClientUser,
	Weapon,
} from "~/schemas";

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

/**
	* Backend (infrastructure) provider enum used to determine which backend to use at build time.
	*
	* @export
	* @enum {string}
	*/
export enum BackendProvider {
	POCKETBASE = "pocketbase",
}

export interface SigninProps {
	username: string;
	password: string;
}

export type ProviderFunction = {
	activities: {
		create: (
			data: ActivityCreateInput,
			collection?: Collections.ACTIVITIES,
		) => Promise<ActivityCollectionItem>;
		read: (
			options: ReadSingleOptions | ReadListRequest,
		) => Promise<Activity | ReadListResponse<Activity>>;
		update: (
			id: string,
			data: any,
			collection?: Collections.ACTIVITIES,
		) => Promise<ActivityCollectionItem>;
		delete: (
			id: string,
			collection?: Collections.ACTIVITIES,
		) => Promise<boolean>;
	};
	activitiesWeapons: {
		create: (
			data: ActivityWeaponCreateInput,
			collection?: Collections.ACTIVITIES_WEAPONS,
		) => Promise<ActivityWeaponCollectionItem>;
		read: (
			options: ReadSingleOptions | ReadListRequest,
		) => Promise<ActivityWeapon | ReadListResponse<ActivityWeapon>>;
		update: (
			id: string,
			data: Partial<ActivityWeaponCreateInput>,
			collection?: Collections.ACTIVITIES_WEAPONS,
		) => Promise<ActivityWeaponCollectionItem>;
		delete: (
			id: string,
			collection?: Collections.ACTIVITIES_WEAPONS,
		) => Promise<boolean>;
		deleteByActivity: (activityId: string) => Promise<boolean>;
	};
	auth: {
		login: (props: SigninProps) => Promise<ClientUser>;
		logout: () => boolean;
		refresh: () => void;
		validate: () => Promise<{ user: ClientUser | null }>
	};
	claims: {
		create: (
			data: ClaimCreateInput,
			collection?: Collections.CLAIMS,
		) => Promise<ClaimCollectionItem>;
		read: (
			options: ReadSingleOptions | ReadListRequest,
		) => Promise<Claim | ReadListResponse<Claim>>;
		update: (
			id: string,
			data: any,
			collection?: Collections.CLAIMS,
		) => Promise<ClaimCollectionItem>;
		delete: (
			id: string,
			collection?: Collections.CLAIMS,
		) => Promise<boolean>;
	};
	file: {
		create: (
			data: FileCreateInput,
			collection?: Collections.FILES,
		) => Promise<FileCollectionItem>;
		read: (
			options: ReadSingleOptions | ReadListRequest
		) => Promise<AppFile | ReadListResponse<AppFile>>;
		update: (
			id: string,
			data: any,
			collection?: Collections.FILES,
		) => Promise<FileCollectionItem>;
		delete: (
			id: string,
			collection?: Collections.FILES,
		) => Promise<boolean>;
		getUrl: (record: AppFile) => Promise<string>;
	};
	user: {
		create: (
			data: UserCreateInput,
			collection?: Collections.USERS,
		) => Promise<UserCollectionItem>;
		read: (
			options: ReadSingleOptions | ReadListRequest
		) => Promise<ClientUser | ReadListResponse<ClientUser>>;
		update: (
			id: string,
			data: any,
			collection?: Collections.USERS,
		) => Promise<UserCollectionItem>;
		updateEmail: (
			newEmail: string,
		) => Promise<boolean>,
		delete: (
			id: string,
			collection?: Collections.USERS,
		) => Promise<boolean>;
	},
	weapons: {
		create: (
			data: WeaponCreateInput,
			collection?: Collections.WEAPONS,
		) => Promise<WeaponCollectionItem>;
		read: (
			options: ReadSingleOptions | ReadListRequest
		) => Promise<Weapon | ReadListResponse<Weapon>>;
		update: (
			id: string,
			data: any,
			collection?: Collections.WEAPONS,
		) => Promise<WeaponCollectionItem>;
		delete: (
			id: string,
			collection?: Collections.WEAPONS,
		) => Promise<boolean>;
	}
};
