import {
	WeaponCreateInput,
	WeaponCollectionItem,
	ReadSingleOptions,
	WeaponUpdateInput,
	ReadListResponse,
	ReadListRequest,
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
	auth: {
		validate: () => Promise<{ user: ClientUser | null }>
		login: (props: SigninProps) => Promise<ClientUser>;
		logout: () => boolean;
	};
	weapon: {
		create: (data: WeaponCreateInput) => Promise<WeaponCollectionItem>;
		read: (options: ReadSingleOptions | ReadListRequest) => Promise<WeaponCollectionItem | ReadListResponse<WeaponCollectionItem>>;
		update: (id: string, data: WeaponUpdateInput) => Promise<WeaponCollectionItem>;
		delete: (id: string) => Promise<boolean>;
	}
};
