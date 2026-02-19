import { Accessor, Setter } from "solid-js";
import { ColorMode } from "./enum";
import {
	ActivityCollectionItem,
	ClaimCollectionItem,
	Collections,
	WeaponCollectionItem,
} from "./pocketbase";
import { ClientUser } from "./user";

export interface StoreFactoryProps {
	storeItem: Setter<any>;
	collection: Collections;
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
	activities: Accessor<ActivityCollectionItem[]>;
	activitiesSet: Setter<ActivityCollectionItem[]>;
	activitiesTotal: Accessor<number>;
	activitiesTotalSet: Setter<number>;
	activitiesPageCount: Accessor<number>;
	activitiesPageCountSet: Setter<number>;
	activitiesCurrentPage: Accessor<number>;
	activitiesCurrentPageSet: Setter<number>;
	claims: Accessor<ClaimCollectionItem[]>;
	claimsSet: Setter<ClaimCollectionItem[]>;
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
	weapons: Accessor<WeaponCollectionItem[]>;
	weaponsSet: Setter<WeaponCollectionItem[]>;
	working: Accessor<boolean>;
	workingSet: Setter<boolean>;
}
