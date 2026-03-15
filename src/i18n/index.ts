import { en } from "~/i18n/en";
import { sv } from "~/i18n/sv";

export const translations = {
	en,
	sv,
};

export type UserLanguage = keyof typeof translations;

export const languageKeys = Object.keys(translations) as [UserLanguage, ...UserLanguage[]];
