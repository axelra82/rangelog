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
	email: string;
	password: string;
}

export type ProviderFunction = {
	auth: {
		signin: <SigninProps, GenericReturn>(props: SigninProps) => Promise<GenericReturn>;
		signout: <GenericProps, GenericReturn>(props?: GenericProps) => GenericReturn;
	};
};
