import PocketBase, { LocalAuthStore } from "pocketbase";

const pocketbaseProtocol = "https";
const pocketbaseAddress = "rangelog.lalaland.app";
const pocketbaseURL = `${pocketbaseProtocol}://${pocketbaseAddress}`;

export const pocketbaseAPIURL = `${pocketbaseURL}/api`;
export const pocketbaseFilesURL = `${pocketbaseAPIURL}/files`;

export const pb = new PocketBase(pocketbaseURL, new LocalAuthStore("rangelog"));
