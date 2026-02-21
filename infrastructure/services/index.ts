import { createProvider } from "./factory";

export * from "./helpers";

export const {
	activities,
	activitiesWeapons,
	auth,
	claims,
	file,
	user,
	weapons,
} = createProvider();
