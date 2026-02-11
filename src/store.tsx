
import { StoreContextType } from "./types";
import { pb } from "./utilities/pocketbase";

import {
	createContext,
	JSX,
	useContext,
} from "solid-js";

const storeContextValue = {}

const StoreContext = createContext<StoreContextType>(storeContextValue);

export const StoreContextProvider = (props: { children: JSX.Element }) => (
	<StoreContext.Provider value={storeContextValue}>
		{props.children}
	</StoreContext.Provider>
);

export const useStore = () => {
	const store = useContext(StoreContext);

	if (!store && !pb.authStore.isValid) {
		throw new Error("Can't continue without store data.");
	}

	return store;
};

/**
	* Run all queries and set store data.
	*/
export const populateStore = () => { };
