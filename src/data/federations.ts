import federationsData from "./federations.json";

export const federations = federationsData as string[];
export const federationValues = federations as [string, ...string[]];

export type Federations = typeof federationValues[number];
