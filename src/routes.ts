import { lazy } from "solid-js";

export const dashboardRoutes = [
	{
		label: "Dashboard",
		path: [
			"/",
			"/dashboard",
		],
		component: lazy(() => import("./pages/dashboard")),
	},
	{
		label: "Aktiviteter",
		path: "/activities",
		component: lazy(() => import("./pages/activities")),
	},
	{
		label: "Vapen",
		path: "/weapons",
		component: lazy(() => import("./pages/weapons")),
	},
	{
		label: "Profil",
		path: "/profile",
		component: lazy(() => import("./pages/profile")),
	},
	{
		label: "Admin",
		path: "/admin",
		component: lazy(() => import("./pages/admin")),
	},
];
