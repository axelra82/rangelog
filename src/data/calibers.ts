import calibersData from "./calibers.json";

export const calibers = calibersData;

export type Caliber = typeof calibers[number];
