import { ActivityWeaponCollectionItem } from "./activity-weapon";

export interface ActivityCollectionItem {
	club?: string;
	created: string;
	date: string;
	exercises?: string;
	expand?: {
		"activity_weapons_via_activity": ActivityWeaponCollectionItem[];
	};
	id: string;
	location?: string;
	notes?: string;
	owner: string;
	rangeMaster?: string;
	updated: string;
}

export type ActivityCreateInput = Omit<
	ActivityCollectionItem,
	"id" | "created" | "updated"
>;
