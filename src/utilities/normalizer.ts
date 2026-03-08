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
	NormalizeParser,
} from "~/types";

const genericNormalizer = <T>(
	data: Record<string, unknown>,
	validator: ZodType<T>,
	parser: NormalizeParser<T>,
): Readonly<T> => {
	// Build all keys passed through as-is (avoid adding empty values in parser)
	const passthrough = Object.keys(data).reduce((acc, key) => {
		// parser will handle this key
		if (key in parser) {
			return acc;
		}
		return { ...acc, [key]: data[key] };
	}, {} as Record<string, unknown>);

	// Apply parser mappings
	const mapped = Object.keys(parser).reduce((acc, sourceKey) => {
		if (!(sourceKey in data)) {
			return acc;
		}

		const {
			key,
			transform,
		} = parser[sourceKey]!;

		const value = transform
			? transform(data[sourceKey])
			: data[sourceKey];

		// remove key if value is `undefined`
		if (value === undefined) {
			return acc;
		}

		const targetKey = key ?? (sourceKey as keyof T);

		return { ...acc, [targetKey]: value };
	}, passthrough);

	// This throws a ZodError with a clear message if the shape is wrong.
	const {
		data: parsedData,
		error,
	} = validator.safeParse(mapped);

	if (error) {
		throw new Error(error.message);
	}

	return Object.freeze(parsedData);
};

export const normalizeActivity = (
	data: Record<string, any>,
	parser: NormalizeParser<Activity>,
): Readonly<Activity> => genericNormalizer(data, activitySchema, parser);

export const normalizeActivityWeapon = (
	data: Record<string, any>,
	parser: NormalizeParser<ActivityWeapon>,
): Readonly<ActivityWeapon> => genericNormalizer(data, activityWeaponSchema, parser);

export const normalizeAppFile = (
	data: Record<string, any>,
	parser: NormalizeParser<AppFile>,
): Readonly<AppFile> => genericNormalizer(data, appFileSchema, parser);

export const normalizeClaim = (
	data: Record<string, any>,
	parser: NormalizeParser<Claim>,
): Readonly<Claim> => genericNormalizer(data, claimSchema, parser);

export const normalizeUser = (
	data: Record<string, any>,
	parser: NormalizeParser<ClientUser>,
): Readonly<ClientUser> => genericNormalizer(data, clientUserSchema, parser);

export const normalizeWeapon = (
	data: Record<string, any>,
	parser: NormalizeParser<Weapon>,
): Readonly<Weapon> => genericNormalizer(data, weaponSchema, parser);
