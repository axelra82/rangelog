import { Calibers, Federations, WeaponTypes } from "~/data";
import { FileCollectionItem } from "./file";

export interface WeaponCollectionItem {
	activities?: number;
	barrelLength?: string;
	brand?: string;
	caliber?: Calibers[];
	classification?: string;
	created: string;
	documents?: string[];
	expand?: {
		"documents": FileCollectionItem[];
	};
	federation?: Federations;
	id: string;
	image?: string;
	licenseEnd?: string;
	licenseStart?: string;
	manufacturerUrl?: string;
	model?: string;
	name: string;
	notes?: string;
	owner: string;
	price?: number;
	purchaseDate?: string;
	rounds?: number;
	seller?: string;
	sellerUrl?: string;
	serialNumber?: string;
	type: WeaponTypes;
	updated: string;
}
