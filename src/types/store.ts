import { Accessor, Setter } from "solid-js";
import { ColorMode } from "./enum";
import {
	Collections,
} from "./pocketbase";

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
	user: Accessor<any>;
	isAuthenticated: Accessor<boolean>;
	colorMode: Accessor<ColorMode>;
	setColorMode: Setter<ColorMode>;
	logout: () => void;
}
