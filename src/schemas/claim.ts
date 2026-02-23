import { z } from "zod";
import { federationValues } from "~/data";

export const claimSchema = z.object({
	club: z.string().optional(),
	created: z.string(),
	date: z.string(),
	federation: z.enum(federationValues),
	id: z.string(),
	image: z.string().optional(),
	location: z.string().optional(),
	notes: z.string().optional(),
	owner: z.string(),
	rangeMaster: z.string().optional(),
	type: z.string(),
	updated: z.string().optional(),
});

export type Claim = z.infer<typeof claimSchema>;

export type ClaimCreateInput = Omit<
	Claim,
	"id" | "created" | "updated"
>;
