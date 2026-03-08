export type FieldMapping<TObject, TValue = unknown> = {
	key?: keyof TObject;
	transform?: (value: unknown) => TValue;
};

export type NormalizeParser<T> = {
	// optional known keys
	[K in keyof T]?: FieldMapping<T, T[K]>;
} & {
	// source keys to transform (i.e `sk`)
	[key: string]: FieldMapping<T>;
};
