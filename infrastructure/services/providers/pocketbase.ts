import { ProviderFunction } from "@/types/data-provider";

import { pocketbaseSignIn, pocketbaseSignOut } from "../../adapters/pocketbase";

export const createPocketbaseProvider = (): ProviderFunction => ({
	auth: {
		signin: pocketbaseSignIn as <P = unknown, R = unknown>(props: P) => R,
		signout: pocketbaseSignOut as <P = unknown, R = unknown>(props: P) => R,
	},
});
