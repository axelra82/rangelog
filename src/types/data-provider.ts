import {
	WeaponCreateInput,
	WeaponCollectionItem,
	ReadSingleOptions,
	WeaponUpdateInput,
	ReadListResponse,
	ReadListRequest,
	ActivityCollectionItem,
	ActivityCreateInput,
	ActivityWeaponEntry,
	ActivityWeaponCreateInput,
	ClaimCollectionItem,
	ClaimCreateInput,
	Collections,
} from "./pocketbase";
import { ClientUser } from "./user";

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
			collection?: Collections.ACTIVITIES,
		) => Promise<ActivityCollectionItem | ReadListResponse<ActivityCollectionItem>>;
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
		) => Promise<ActivityWeaponEntry>;
		read: (
			options: ReadSingleOptions | ReadListRequest,
			collection?: Collections.ACTIVITIES_WEAPONS,
		) => Promise<ActivityWeaponEntry | ReadListResponse<ActivityWeaponEntry>>;
		update: (
			id: string,
			data: Partial<ActivityWeaponCreateInput>,
			collection?: Collections.ACTIVITIES_WEAPONS,
		) => Promise<ActivityWeaponEntry>;
		delete: (
			id: string,
			collection?: Collections.ACTIVITIES_WEAPONS,
		) => Promise<boolean>;
		deleteByActivity: (activityId: string) => Promise<boolean>;
	};
	claims: {
		create: (
			data: ClaimCreateInput,
			collection?: Collections.CLAIMS,
		) => Promise<ClaimCollectionItem>;
		read: (
			options: ReadSingleOptions | ReadListRequest,
			collection?: Collections.CLAIMS,
		) => Promise<ClaimCollectionItem | ReadListResponse<ClaimCollectionItem>>;
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
	auth: {
		validate: () => Promise<{ user: ClientUser | null }>
		login: (props: SigninProps) => Promise<ClientUser>;
		logout: () => boolean;
	};
	weapons: {
		create: (
			data: WeaponCreateInput,
			collection?: Collections.WEAPONS,
		) => Promise<WeaponCollectionItem>;
		read: (
			options: ReadSingleOptions | ReadListRequest,
			collection?: Collections.WEAPONS,
		) => Promise<WeaponCollectionItem | ReadListResponse<WeaponCollectionItem>>;
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
