import PocketBase, { LocalAuthStore } from "pocketbase";

const pocketbaseProtocol = import.meta.env.VITE_RANGELOG_URL_PROTOCOL;

const pocketbaseSubdomain = import.meta.env.VITE_RANGELOG_URL_SUBDOMAIN;

const pocketbaseAddress =
	pocketbaseSubdomain
		?
		`${import.meta.env.VITE_RANGELOG_URL_SUBDOMAIN}.${import.meta.env.VITE_RANGELOG_URL_DOMAIN}`
		:
		`${import.meta.env.VITE_RANGELOG_URL_DOMAIN}`
	;

const pocketbasePort = import.meta.env.VITE_RANGELOG_URL_PORT;

const pocketbaseURL =
	pocketbasePort
		&& import.meta.env.VITE_RANGELOG_LOCALHOST
		?
		`${pocketbaseProtocol}://${pocketbaseAddress}:${pocketbasePort}`
		:
		`${pocketbaseProtocol}://${pocketbaseAddress}`;

export const pocketbaseAPIURL = `${pocketbaseURL}/api`;
export const pocketbaseFilesURL = `${pocketbaseAPIURL}/files`;

export const pb = new PocketBase(pocketbaseURL, new LocalAuthStore(import.meta.env.VITE_RANGELOG_APP_NAME));

export * from "./activitiesWeapon";
export * from "./authentication";
export * from "./files";
export * from "./helpers";
export * from "./schema";
export * from "./types";
export * from "./users";
