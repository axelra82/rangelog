export const weaponTypes = [
	"Välj typ",
	"Kulgevär",
	"Hagelgevär",
	"Pistol",
	"Revolver",
	"Annat"
] as const;

export type Weapons = typeof weaponTypes[number];
