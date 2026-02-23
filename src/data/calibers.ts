import calibersData from "./calibers.json";

export const calibers = calibersData as string[];
export const caliberValues = calibers as [string, ...string[]];

export type Calibers = typeof caliberValues[number];
