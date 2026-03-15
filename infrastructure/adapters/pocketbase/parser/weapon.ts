import {
	Weapon,
} from "~/schemas";
import {
	NormalizeParser,
} from "~/types";

export const pocketbaseWeaponParser: NormalizeParser<Weapon> = {
	federation: {
		transform: (value) => {
			if (typeof value !== "string") {
				throw Error("federation must be a string");
			}
			return value === "" ? undefined : value;
		},
	},
};
