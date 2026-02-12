import { ProviderFunction } from "@/types/data-provider";

import { pocketbaseSignIn, pocketbaseSignOut } from "../../adapters/pocketbase/authentication";

export const createPocketbaseProvider = (): ProviderFunction => ({
	auth: {
		signin: pocketbaseSignIn,
		signout: pocketbaseSignOut,
	},
});
