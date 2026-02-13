import { StoreContextType, WeaponCollectionItem } from "./types";
import { ColorMode } from "./types";

import {
	createContext,
	JSX,
	useContext,
	createSignal,
	createEffect,
} from "solid-js";
import { ClientUser } from "./types/user";

const STORAGE_KEY = "color-mode";
const savedMode = (localStorage.getItem(STORAGE_KEY) as ColorMode) ?? ColorMode.SYSTEM;

const StoreContext = createContext<StoreContextType>();

export const StoreContextProvider = (props: { children: JSXElement }) => {
	const [colorMode, colorModeSet] = createSignal<ColorMode>(savedMode);
	const [isAuthenticated, isAuthenticatedSet] = createSignal(false);
	const [user, userSet] = createSignal<ClientUser>({
		created: "",
		email: "",
		id: ""
	});
	const [weapons, weaponsSet] = createSignal<WeaponCollectionItem[]>([]);
	const [working, workingSet] = createSignal<boolean>(false);

	createEffect(() => {
		localStorage.setItem(STORAGE_KEY, colorMode());
	});

	const storeContextValue = {
		colorMode,
		colorModeSet,
		isAuthenticated,
		isAuthenticatedSet,
		user,
		userSet,
		weapons,
		weaponsSet,
		working,
		workingSet,
	};

	return (
		<StoreContext.Provider value={storeContextValue}>
			{props.children}
		</StoreContext.Provider>
	);
};

export const useStore = () => {
	const store = useContext(StoreContext);

	if (!store) {
		throw new Error("useStore must be used within StoreContextProvider");
	}

	return store;
};
