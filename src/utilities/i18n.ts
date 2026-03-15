import { translations, UserLanguage } from "~/i18n";
import { TranslationKey, TranslationObject, TranslationValue } from "~/types/i18n";

const getNestedValue = (path: string, language: UserLanguage): TranslationValue | undefined => {
	const obj = translations[language] as TranslationObject;

	return path.split(".").reduce<TranslationValue | undefined>((acc, key) => {
		if (acc && typeof acc === "object" && !Array.isArray(acc) && key in acc) {
			return (acc as TranslationObject)[key];
		}

		return undefined;
	}, obj as TranslationValue);
};

export const t = (key: TranslationKey, language: UserLanguage, args?: number): string => {
	const value = getNestedValue(key, language);

	if (typeof value === "string") {
		return value;
	} else if (args !== undefined && typeof value === "function") {
		return value(args);
	} else {
		return `Missing translation for ${key}`;
	}
};
