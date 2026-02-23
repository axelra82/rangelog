export type FieldMapping<T> = {
	key?: keyof T;
	transform?: (value: any) => any;
};

export type NormalizerSchema<T> = Partial<Record<string, FieldMapping<T>>>;
