import { Federations } from "~/data";

export interface ClaimCollectionItem {
	club?: string;
	created: string;
	date: string;
	federation: Federations;
	id: string;
	image?: string;
	location?: string;
	notes?: string;
	owner: string;
	rangeMaster?: string;
	type: string;
	updated: string;
}
