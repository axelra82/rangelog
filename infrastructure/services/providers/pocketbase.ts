import { ProviderFunction } from "@/types/data-provider";

import {
	pocketbaseAuthValidate,
	pocketbaseLogin,
	pocketbaseLogout
} from "../../adapters/pocketbase/authentication";

export const createPocketbaseProvider = (): ProviderFunction => ({
	auth: {
		validate: pocketbaseAuthValidate,
		login: pocketbaseLogin,
		logout: pocketbaseLogout,
	},
});
