import { ProviderFunction } from "@/types/data-provider";

import {
	pocketbaseAuthValidate,
	pocketbaseSignIn,
	pocketbaseSignOut
} from "../../adapters/pocketbase/authentication";

export const createPocketbaseProvider = (): ProviderFunction => ({
	auth: {
		validate: pocketbaseAuthValidate,
		signin: pocketbaseSignIn,
		signout: pocketbaseSignOut,
	},
});
