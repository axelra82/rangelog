import weaponsData from "./weapon-types.json";

export const weaponTypes = weaponsData;

export type WeaponTypes = typeof weaponTypes[number];
