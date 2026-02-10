export const claims = [
	"Precision Guld",
	"Precision Silver",
	"Precision Brons",
	"Snabb Guld",
	"Snabb Silver",
	"Snabb Brons"
] as const;

export type Claims = typeof claims[number];
