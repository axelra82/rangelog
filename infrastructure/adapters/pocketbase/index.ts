import PocketBase, { LocalAuthStore } from "pocketbase";

const pocketbaseProtocol = "https";
const pocketbaseAddress = `${import.meta.env.VITE_APP_NAME}.lalaland.app`;
const pocketbaseURL = `${pocketbaseProtocol}://${pocketbaseAddress}`;

export const pocketbaseAPIURL = `${pocketbaseURL}/api`;
export const pocketbaseFilesURL = `${pocketbaseAPIURL}/files`;

export const pb = new PocketBase(pocketbaseURL, new LocalAuthStore(import.meta.env.VITE_APP_NAME));
