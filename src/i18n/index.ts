import { en } from "~/i18n/en";
import { sv } from "~/i18n/sv";

export const translations = {
	en,
	sv,
};

export type Language = keyof typeof translations;
