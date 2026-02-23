import { Accessor, Setter } from "solid-js";
import { ColorMode } from "~/types";

import {
	Activity,
	Claim,
	ClientUser,
	Weapon,
} from "~/schemas";

export interface StoreFactoryProps {
	storeItem: Setter<any>;
	getOne?: {
		id: string;
		field: string;
	};
	fullList?: boolean;
	listPage?: number;
	listPerPage?: number;
	options?: Record<string, string>;
};

export type ResourceHelper<T> = T & { disabled: false };

export interface StoreContextProps {
	activities: Accessor<Activity[]>;
	activitiesSet: Setter<Activity[]>;
	activitiesTotal: Accessor<number>;
	activitiesTotalSet: Setter<number>;
	activitiesPageCount: Accessor<number>;
	activitiesPageCountSet: Setter<number>;
	activitiesCurrentPage: Accessor<number>;
	activitiesCurrentPageSet: Setter<number>;
	claims: Accessor<Claim[]>;
	claimsSet: Setter<Claim[]>;
	claimsTotal: Accessor<number>;
	claimsTotalSet: Setter<number>;
	claimsPageCount: Accessor<number>;
	claimsPageCountSet: Setter<number>;
	claimsCurrentPage: Accessor<number>;
	claimsCurrentPageSet: Setter<number>;
	colorMode: Accessor<ColorMode>;
	isAuthenticated: Accessor<boolean>;
	isAuthenticatedSet: Setter<boolean>;
	isMobile: Accessor<boolean>;
	colorModeSet: Setter<ColorMode>;
	user: Accessor<ClientUser>;
	userSet: Setter<ClientUser>;
	weapons: Accessor<Weapon[]>;
	weaponsSet: Setter<Weapon[]>;
	working: Accessor<boolean>;
	workingSet: Setter<boolean>;
}
