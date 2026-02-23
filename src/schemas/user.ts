import { z } from "zod";

export const clientUserSchema = z.object({
	activities: z.number(),
	admin: z.boolean().optional(),
	avatar: z.string().optional(),
	claims: z.number(),
	created: z.string(),
	email: z.email(),
	id: z.string(),
	name: z.string().optional(),
	updated: z.string().optional(),
	verified: z.boolean().optional(),
	weapons: z.number(),
});

export type ClientUser = z.infer<typeof clientUserSchema>;
