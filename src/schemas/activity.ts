import { z } from "zod";
import { activityWeaponSchema } from "./activity-weapon";

export const activitySchema = z.object({
	club: z.string().optional(),
	created: z.string(),
	date: z.string(),
	exercises: z.string().optional(),
	expand: z.object({
		"activity_weapons_via_activity": z.array(activityWeaponSchema).optional(),
	}).optional(),
	id: z.string(),
	location: z.string().optional(),
	notes: z.string().optional(),
	owner: z.string(),
	rangeMaster: z.string().optional(),
	updated: z.string()
});

export type Activity = z.infer<typeof activitySchema>;
