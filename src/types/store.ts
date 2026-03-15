import { Accessor, Setter } from "solid-js";

import { UserLanguage } from "~/i18n";
import {
	Activity,
	Claim,
	ClientUser,
	Weapon,
} from "~/schemas";
import { UserTheme } from "~/types";

export interface StoreFactoryProps {
	storeItem: Setter<unknown>;
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
	activitiesCurrentPage: Accessor<number>;
	activitiesCurrentPageSet: Setter<number>;
	activitiesPageCount: Accessor<number>;
	activitiesPageCountSet: Setter<number>;
	activitiesSet: Setter<Activity[]>;
	activitiesTotal: Accessor<number>;
	activitiesTotalSet: Setter<number>;
	claims: Accessor<Claim[]>;
	claimsCurrentPage: Accessor<number>;
	claimsCurrentPageSet: Setter<number>;
	claimsPageCount: Accessor<number>;
	claimsPageCountSet: Setter<number>;
	claimsSet: Setter<Claim[]>;
	claimsTotal: Accessor<number>;
	claimsTotalSet: Setter<number>;
	isAuthenticated: Accessor<boolean>;
	isAuthenticatedSet: Setter<boolean>;
	isMobile: Accessor<boolean>;
	language: Accessor<UserLanguage>;
	languageSet: Setter<UserLanguage>;
	theme: Accessor<UserTheme>;
	themeSet: Setter<UserTheme>;
	user: Accessor<ClientUser>;
	userSet: Setter<ClientUser>;
	weapons: Accessor<Weapon[]>;
	weaponsSet: Setter<Weapon[]>;
	working: Accessor<boolean>;
	workingSet: Setter<boolean>;
}
