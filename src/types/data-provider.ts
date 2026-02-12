import { WeaponCreateInput, WeaponCollectionItem, ReadSingleOptions, ReadListOptions, WeaponUpdateInput } from "./pocketbase";
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
		read: (options: ReadSingleOptions | ReadListOptions) => Promise<WeaponCollectionItem | { items: WeaponCollectionItem[]; page: number; totalPages: number; totalItems: number; }>;
		update: (id: string, data: WeaponUpdateInput) => Promise<WeaponCollectionItem>;
		delete: (id: string) => Promise<boolean>;
	}
};
