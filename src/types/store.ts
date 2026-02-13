import { Accessor, Setter } from "solid-js";
import { ColorMode } from "./enum";
import {
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

export type StoreContextType = {
	colorMode: Accessor<ColorMode>;
	isAuthenticated: Accessor<boolean>;
	isAuthenticatedSet: Setter<boolean>;
	colorModeSet: Setter<ColorMode>;
	user: Accessor<ClientUser>;
	userSet: Setter<ClientUser>;
	weapons: Accessor<WeaponCollectionItem[]>;
	weaponsSet: Setter<WeaponCollectionItem[]>;
	working: Accessor<boolean>;
	workingSet: Setter<boolean>;
}
