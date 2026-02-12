import { pb } from "../infrastructure/adapters/pocketbase";
import { StoreContextType } from "./types";
import { ColorMode } from "./types";

import {
	createContext,
	JSX,
	useContext,
	createSignal,
	createEffect,
	onMount,
} from "solid-js";

const STORAGE_KEY = "color-mode";
const savedMode = (localStorage.getItem(STORAGE_KEY) as ColorMode) ?? ColorMode.SYSTEM;

const StoreContext = createContext<StoreContextType>();

export const StoreContextProvider = (props: { children: JSX.Element }) => {
	const [user, setUser] = createSignal(pb.authStore.record);
	const [isAuthenticated, setIsAuthenticated] = createSignal(pb.authStore.isValid);
	const [colorMode, setColorMode] = createSignal<ColorMode>(savedMode);

	createEffect(() => {
		localStorage.setItem(STORAGE_KEY, colorMode());
	});

	onMount(() => {
		// Enable auto-refresh with cookie storage
		pb.autoCancellation(false);
		pb.authStore.onChange(() => {
			setUser(pb.authStore.model);
			setIsAuthenticated(pb.authStore.isValid);
		});
	});

	const storeContextValue = {
		user,
		isAuthenticated,
		colorMode,
		setColorMode,
		logout: () => pb.authStore.clear(),
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
