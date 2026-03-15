import { Component, createSignal, For } from "solid-js";

import { type Language, translations } from "~/i18n";
import { t } from "~/utilities";

import { SelectNative } from "../ui";

export const [language, setLanguage] = createSignal<Language>("en");

interface SelectLanguageProps {
	class?: string;
}

export const SelectLanguage: Component<SelectLanguageProps> = (props) => (
	<SelectNative
		onChange={(event) => (setLanguage(event.target.value as Language))}
		value={language()}
		{...props}
	>
		<For each={Object.keys(translations)}>
			{(translation) => (
				<option value={translation}>
					{t(translation as Language)}
				</option>
			)}
		</For>
	</SelectNative>
);
