import { z } from "zod";

import { languageKeys } from "~/i18n";
import { UserTheme } from "~/types";

export const clientUserSchema = z.object({
	activities: z.number(),
	admin: z.boolean().optional(),
	avatar: z.string().optional(),
	claims: z.number(),
	created: z.string(),
	email: z.email(),
	id: z.string(),
	language: z.enum(languageKeys).optional(),
	name: z.string().optional(),
	theme: z.enum(UserTheme).optional(),
	updated: z.string().optional(),
	verified: z.boolean().optional(),
	weapons: z.number(),
});

export type ClientUser = z.infer<typeof clientUserSchema>;

export type ClientUserCreateInput = Omit<
	ClientUser,
	"id" | "created" | "updated" | "activities" | "claims" | "weapons"
> & {
	password: string;
	passwordConfirm: string;
	emailVisibility: boolean;
};

export type ClientUserUpdateInput = Omit<
	ClientUser,
	"id" | "created" | "updated" | "activities" | "claims" | "weapons"
> & {
	oldPassword: string;
	password: string;
	passwordConfirm: string;
	emailVisibility: boolean;
};
