import calibersData from "./calibers.json";

export const calibers = calibersData;

export type Calibers = typeof calibers[number];
