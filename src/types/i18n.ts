import { translations } from "~/i18n";

export type TranslationValue = string | ((...args: number[]) => string) | TranslationObject;
export type TranslationObject = { [key: string]: TranslationValue };

export type DotPaths<T, Prefix extends string = ""> = {
	[K in keyof T & string]: T[K] extends string | ((...args: number[]) => string)
	? `${Prefix}${K}`
	: T[K] extends object
	? DotPaths<T[K], `${Prefix}${K}.`>
	: never;
}[keyof T & string];

export type TranslationKey = DotPaths<typeof translations.en>;
