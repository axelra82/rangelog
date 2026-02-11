import claimsData from "./claims.json";

export const claims = claimsData;

export type Claims = typeof claims[number];
