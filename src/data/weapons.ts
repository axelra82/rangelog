import weaponsData from "./weapons.json";

export const weaponTypes = weaponsData;

export type Weapons = typeof weaponTypes[number];
