import { ZodType } from "zod";
import {
	Activity,
	activitySchema,
	ActivityWeapon,
	activityWeaponSchema,
	AppFile,
	appFileSchema,
	Claim,
	claimSchema,
	ClientUser,
	clientUserSchema,
	Weapon,
	weaponSchema,
} from "~/schemas";

import {
	NormalizerSchema,
} from "~/types";

const genericNormalizer = <T>(
	data: Record<string, any>,
	validator: ZodType<T>,
	schema: NormalizerSchema<T>,
): Readonly<T> => {
	const mapped = Object.keys(schema).reduce((acc, sourceKey) => {
		if (!(sourceKey in data)) {
			return acc;
		}

		const {
			key,
			transform,
		} = schema[sourceKey]!;

		const value = transform ? transform(data[sourceKey]) : data[sourceKey];

		const targetKey = key ?? (sourceKey as keyof T);

		return {
			...acc,
			[targetKey]: value,
		};
	}, {} as Record<string, any>);

	// This throws a ZodError with a clear message if the shape is wrong.
	const {
		data: ParsedData,
		error,
	} = validator.safeParse(mapped);

	if (error) {
		throw Error(error.message);
	}

	return Object.freeze(ParsedData);
};

export const normalizeActivity = (
	data: Record<string, any>,
	schema: NormalizerSchema<Activity>,
): Readonly<Activity> => genericNormalizer(data, activitySchema, schema);

export const normalizeActivityWeapon = (
	data: Record<string, any>,
	schema: NormalizerSchema<ActivityWeapon>,
): Readonly<ActivityWeapon> => genericNormalizer(data, activityWeaponSchema, schema);

export const normalizeAppFile = (
	data: Record<string, any>,
	schema: NormalizerSchema<AppFile>,
): Readonly<AppFile> => genericNormalizer(data, appFileSchema, schema);

export const normalizeClaim = (
	data: Record<string, any>,
	schema: NormalizerSchema<Claim>,
): Readonly<Claim> => genericNormalizer(data, claimSchema, schema);

export const normalizeUser = (
	data: Record<string, any>,
	schema: NormalizerSchema<ClientUser>,
): Readonly<ClientUser> => genericNormalizer(data, clientUserSchema, schema);

export const normalizeWeapon = (
	data: Record<string, any>,
	schema: NormalizerSchema<Weapon>,
): Readonly<Weapon> => genericNormalizer(data, weaponSchema, schema);
