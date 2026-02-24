import { z } from "zod";
import { caliberValues, federationValues, weaponValues } from "~/data";
import { appFileSchema } from "./file";

export const weaponSchema = z.object({
	barrelLength: z.string().optional(),
	brand: z.string().optional(),
	caliber: z.array(z.enum(caliberValues)).optional(),
	classification: z.string().optional(),
	created: z.string(),
	documents: z.array(z.string()).optional(),
	expand: z.object({
		documents: z.array(appFileSchema).optional(),
	}).optional(),
	federation: z.enum(federationValues).optional(),
	id: z.string(),
	image: z.string().optional(),
	licenseEnd: z.string().optional(),
	licenseStart: z.string().optional(),
	manufacturerUrl: z.string().optional(),
	model: z.string().optional(),
	name: z.string(),
	notes: z.string().optional(),
	owner: z.string(),
	price: z.number().optional(),
	purchaseDate: z.string().optional(),
	seller: z.string().optional(),
	sellerUrl: z.string().optional(),
	serialNumber: z.string().optional(),
	type: z.enum(weaponValues),
	updated: z.string(),
});

export type Weapon = z.infer<typeof weaponSchema>;

export type WeaponCreateInput = Omit<
	Weapon,
	"id" | "created" | "updated"
>;

export type WeaponUpdateInput = Partial<Weapon>;
