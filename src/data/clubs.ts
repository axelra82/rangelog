import clubsData from "./clubs.json";

// TODO: Look for existing Swedish gun club API.
export const clubs = clubsData;

export type Clubs = typeof clubs[number];
