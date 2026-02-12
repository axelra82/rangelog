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
};
