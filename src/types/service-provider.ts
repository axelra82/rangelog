import {
	Activity,
	ActivityCreateInput,
	ActivityWeapon,
	ActivityWeaponCreateInput,
	AppFile,
	AppFileCreateInput,
	Claim,
	ClaimCreateInput,
	ClientUser,
	ClientUserCreateInput,
	ClientUserUpdateInput,
	Weapon,
	WeaponCreateInput,
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
		) => Promise<Activity>;
		read: (
			options: ReadSingleOptions | ReadListRequest,
		) => Promise<Activity | ReadListResponse<Activity>>;
		update: (
			id: string,
			data: Partial<ActivityCreateInput>,
		) => Promise<Activity>;
		delete: (
			id: string,
		) => Promise<boolean>;
	};
	activitiesWeapons: {
		create: (
			data: ActivityWeaponCreateInput,
		) => Promise<ActivityWeapon>;
		read: (
			options: ReadSingleOptions | ReadListRequest,
		) => Promise<ActivityWeapon | ReadListResponse<ActivityWeapon>>;
		update: (
			id: string,
			data: Partial<ActivityWeaponCreateInput>,
		) => Promise<ActivityWeapon>;
		delete: (
			id: string,
		) => Promise<boolean>;
		deleteByActivity: (activityId: string) => Promise<boolean>;
	};
	auth: {
		login: (props: SigninProps) => Promise<ClientUser>;
		logout: () => boolean;
		refresh: () => void;
		validate: () => Promise<{ user: ClientUser | null }>;
	};
	claims: {
		create: (
			data: ClaimCreateInput,
		) => Promise<Claim>;
		read: (
			options: ReadSingleOptions | ReadListRequest,
		) => Promise<Claim | ReadListResponse<Claim>>;
		update: (
			id: string,
			data: Partial<ClaimCreateInput>,
		) => Promise<Claim>;
		delete: (
			id: string,
		) => Promise<boolean>;
	};
	file: {
		create: (
			data: AppFileCreateInput,
		) => Promise<AppFile>;
		read: (
			options: ReadSingleOptions | ReadListRequest,
		) => Promise<AppFile | ReadListResponse<AppFile>>;
		update: (
			id: string,
			data: Partial<AppFileCreateInput>,
		) => Promise<AppFile>;
		delete: (
			id: string,
		) => Promise<boolean>;
		getUrl: (record: AppFile) => Promise<string>;
	};
	user: {
		create: (
			data: ClientUserCreateInput,
		) => Promise<ClientUser>;
		read: (
			options: ReadSingleOptions | ReadListRequest,
		) => Promise<ClientUser | ReadListResponse<ClientUser>>;
		update: (
			id: string,
			data: Partial<ClientUserUpdateInput>,
		) => Promise<ClientUser>;
		updateEmail: (
			newEmail: string,
		) => Promise<boolean>;
		delete: (
			id: string,
		) => Promise<boolean>;
	};
	weapons: {
		create: (
			data: WeaponCreateInput,
		) => Promise<Weapon>;
		read: (
			options: ReadSingleOptions | ReadListRequest,
		) => Promise<Weapon | ReadListResponse<Weapon>>;
		update: (
			id: string,
			data: Partial<WeaponCreateInput>,
		) => Promise<Weapon>;
		delete: (
			id: string,
		) => Promise<boolean>;
	};
};
