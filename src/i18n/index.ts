import { en } from "~/i18n/en";
import { sv } from "~/i18n/sv";

export const translations = {
	sv,
	en,
};

export type Language = keyof typeof translations;
