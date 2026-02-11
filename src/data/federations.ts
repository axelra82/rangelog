import federationsData from "./federations.json";

export const federations = federationsData;

export type Federations = typeof federations[number];
