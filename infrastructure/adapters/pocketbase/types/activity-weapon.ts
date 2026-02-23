import { Calibers } from "~/data";

export interface ActivityWeaponCollectionItem {
	activity: string;
	caliber?: Calibers;
	id: string;
	rounds?: number;
	weapon: string;
}

export type ActivityWeaponCreateInput = Omit<
	ActivityWeaponCollectionItem,
	"id"
>;

export interface ShootingEntry {
	caliber?: Calibers;
	rounds?: number;
	weapon: string;
}
