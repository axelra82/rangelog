import { useStore } from "~/store";
import { TranslationKey } from "~/types/i18n";
import { t } from "~/utilities/i18n";

export const useT = () => {
	const {
		language,
	} = useStore();

	return (key: TranslationKey, args?: number) => t(key, language(), args);
};
