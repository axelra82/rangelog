import { z } from "zod";

export const appFileSchema = z.object({
	id: z.string(),
	owner: z.string(),
	name: z.string(),
	source: z.string(),
	size: z.number(),
	type: z.string(),
	created: z.string(),
});

export type AppFile = z.infer<typeof appFileSchema>;
