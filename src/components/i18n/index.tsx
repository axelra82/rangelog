import { Component, For } from "solid-js";

import { translations, type UserLanguage } from "~/i18n";
import { useStore } from "~/store";
import { t } from "~/utilities";

import { SelectNative } from "../ui";

interface SelectLanguageProps {
	class?: string;
}

export const SelectLanguage: Component<SelectLanguageProps> = (props) => {
	const {
		language,
		languageSet,
	} = useStore();

	return (
		<SelectNative
			onChange={(event) => {
				const languageValue = event.target.value as UserLanguage;
				languageSet(languageValue);
				localStorage.setItem("user-language", languageValue);
			}}
			value={language()}
			{...props}
		>
			<For each={Object.keys(translations)}>
				{(translation) => (
					<option value={translation}>
						{t(translation as UserLanguage)}
					</option>
				)}
			</For>
		</SelectNative>
	);
};
