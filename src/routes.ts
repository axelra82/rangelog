import { lazy } from "solid-js";

export const dashboardRoutes = [
	{
		path: [
			"/",
			"/dashboard",
		],
		component: lazy(() => import("./pages/dashboard")),
	},
	{
		path: "/profile",
		component: lazy(() => import("./pages/profile")),
	},
	{
		path: "/activities",
		component: lazy(() => import("./pages/activities")),
	},
	{
		path: "/weapons",
		component: lazy(() => import("./pages/weapons")),
	},
];
