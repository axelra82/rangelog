import claimsData from "./claims.json";

export const claims = claimsData as string[];
export const claimsValues = claims as [string, ...string[]];

export type Claims = typeof claimsValues[number];
