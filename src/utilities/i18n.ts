import { language } from "~/components";
import { translations } from "~/i18n";

type TranslationValue = string | ((...args: number[]) => string) | TranslationObject;
type TranslationObject = { [key: string]: TranslationValue };

// Recursively build dot-notation paths for all string leaves
type DotPaths<T, Prefix extends string = ""> = {
	[K in keyof T & string]: T[K] extends string | ((...args: number[]) => string)
	? `${Prefix}${K}`
	: T[K] extends object
	? DotPaths<T[K], `${Prefix}${K}.`>
	: never;
}[keyof T & string];

type TranslationKey = DotPaths<typeof translations.en>;

const getNestedValue = (obj: TranslationObject, path: string): TranslationValue | undefined => {
	return path.split(".").reduce<TranslationValue | undefined>((acc, key) => {
		if (acc && typeof acc === "object" && !Array.isArray(acc) && key in acc) {
			return (acc as TranslationObject)[key];
		}
		return undefined;
	}, obj as TranslationValue);
};

export const t = (key: TranslationKey, args?: number): string => {
	const value = getNestedValue(
		translations[language()] as TranslationObject,
		key,
	);

	if (typeof value === "string") {
		return value;
	} else if (args !== undefined && typeof value === "function") {
		return value(args);
	} else {
		return `Missing translation for ${key}`;
	}
};
