export enum Collections {
	ACTIVITIES = "activities",
	CLAIMS = "claims",
	WEAPONS = "weapons",
}

export enum PocketbaseQueryParam {
	EXPAND = "expand",
	FIELDS = "fields",
	FILTER = "filter",
	PAGE = "page",
	PER_PAGE = "perPage",
	SKIP_TOTAL = "skipTotal",
	SORT = "sort",
}

interface StandardTableEntity {
	created: Date;
	id: string;
	updated: Date;
}

interface CommonTableEntity {
	description?: string;
	title: string;
}

export interface WeaponsCollectionModel extends StandardTableEntity, CommonTableEntity {
	brand?: string;
	owner: string;
}
