// TODO: Look for existing Swedish gun club API.
import clubsData from "./clubs.json";
import clubNamesData from "./clubnames.json";

interface ClubDataItem {
	name: string;
	url: string;
	number: number;
	region: string;
}

export const clubs = clubsData as ClubDataItem[];
export const clubValues = clubs as [ClubDataItem, ...ClubDataItem[]];

export type Clubs = typeof clubValues[number];

export const clubNames = clubNamesData as string[];
export const clubNameValues = clubNames as [string, ...string[]];

export type ClubNames = typeof clubNameValues[number];
