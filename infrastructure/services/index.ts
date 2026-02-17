import { createProvider } from "./factory";

export * from "./helpers";

export const {
	activities,
	activitiesWeapons,
	claims,
	auth,
	weapons,
} = createProvider();
