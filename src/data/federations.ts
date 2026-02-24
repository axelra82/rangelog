import federationsData from "./federations.json";

export const federations = federationsData;
export const federationValues = federations as string[];

export type Federations = typeof federationValues[number];
