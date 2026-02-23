import { z } from "zod";
import { caliberValues } from "~/data";

export const activityWeaponSchema = z.object({
	activity: z.string(),
	caliber: z.enum(caliberValues),
	id: z.string(),
	rounds: z.number(),
	weapon: z.string(),
});

export type ActivityWeapon = z.infer<typeof activityWeaponSchema>;
