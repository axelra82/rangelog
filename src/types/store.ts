import { Accessor, Setter } from "solid-js";
import { ColorMode } from "./enum";
import {
	Collections,
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
	user: Accessor<ClientUser>;
	userSet: Setter<ClientUser>;
	isAuthenticated: Accessor<boolean>;
	isAuthenticatedSet: Setter<boolean>;
	colorMode: Accessor<ColorMode>;
	setColorMode: Setter<ColorMode>;
}
