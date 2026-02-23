import weaponsData from "./weapon-types.json";

export const weaponTypes = weaponsData as string[];
export const weaponValues = weaponTypes as [string, ...string[]];

export type WeaponTypes = typeof weaponValues[number];
