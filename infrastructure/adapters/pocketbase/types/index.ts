export * from "./activity-weapon";
export * from "./activity";
export * from "./claim";
export * from "./file";
export * from "./user";
export * from "./weapon";

export enum Collections {
	ACTIVITIES = "activities",
	ACTIVITIES_WEAPONS = "activity_weapons",
	CLAIMS = "claims",
	FILES = "files",
	USERS = "users",
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
