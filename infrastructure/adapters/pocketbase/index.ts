import Pocketbase from "pocketbase";

export const pocketbaseURLProtocol = "http";
export const pocketbaseLocalIP = "127.0.0.1";
export const pocketbaseLocalPort = "8090";
export const pocketbaseURL = `${pocketbaseURLProtocol}://${pocketbaseLocalIP}:${pocketbaseLocalPort}`;
export const pocketbaseAPIURL = `${pocketbaseURL}/api`;
export const pocketbaseFileURL = `${pocketbaseAPIURL}/files`;

export const pb = new Pocketbase(pocketbaseURL);

export * from "./authentication";
export * from "./file";
export * from "./user";
