import { createProvider } from "./factory";

export * from "./helpers";

export const {
	activities,
	activitiesWeapons,
	auth,
	weapons,
} = createProvider();
