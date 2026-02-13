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
		create: (data: ActivityCreateInput) => Promise<ActivityCollectionItem>;
		read: (options: ReadSingleOptions | ReadListRequest) => Promise<ActivityCollectionItem | ReadListResponse<ActivityCollectionItem>>;
		update: (id: string, data: any) => Promise<ActivityCollectionItem>;
		delete: (id: string) => Promise<boolean>;
	};
	activitiesWeapons: {
		create: (data: ActivityWeaponCreateInput) => Promise<ActivityWeaponEntry>;
		read: (options: ReadSingleOptions | ReadListRequest) => Promise<ActivityWeaponEntry | ReadListResponse<ActivityWeaponEntry>>;
		update: (id: string, data: Partial<ActivityWeaponCreateInput>) => Promise<ActivityWeaponEntry>;
		delete: (id: string) => Promise<boolean>;
		deleteByActivity: (activityId: string) => Promise<boolean>;
	};
	auth: {
		validate: () => Promise<{ user: ClientUser | null }>
		login: (props: SigninProps) => Promise<ClientUser>;
		logout: () => boolean;
	};
	weapons: {
		create: (data: WeaponCreateInput) => Promise<WeaponCollectionItem>;
		read: (options: ReadSingleOptions | ReadListRequest) => Promise<WeaponCollectionItem | ReadListResponse<WeaponCollectionItem>>;
		update: (id: string, data: WeaponUpdateInput) => Promise<WeaponCollectionItem>;
		delete: (id: string) => Promise<boolean>;
	}
};
