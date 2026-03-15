import { languageKeys, UserLanguage } from "~/i18n";
import {
	ClientUser,
} from "~/schemas";
import {
	NormalizeParser,
	UserTheme,
} from "~/types";

export const pocketbaseUserParser: NormalizeParser<ClientUser> = {
	language: {
		transform: (value) => {
			if (typeof value === "string" && value === "") {
				return undefined;
			}

			if (!languageKeys.includes(value as UserLanguage)) {
				throw Error("language must be a string");
			}

			return value as UserLanguage;
		},
	},
	theme: {
		transform: (value) => {
			if (typeof value === "string" && value === "") {
				return undefined;
			}

			if (!Object.values(UserTheme).includes(value as UserTheme)) {
				throw Error("theme must be a string");
			}

			return value as UserTheme;
		},
	},
};
