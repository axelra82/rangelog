import {
	ActivityCollectionItem,
	ClaimCollectionItem,
	StoreContextType,
	WeaponCollectionItem,
} from "./types";
import { ColorMode } from "./types";

import {
	createContext,
	useContext,
	createSignal,
	createEffect,
	JSXElement,
	onMount,
} from "solid-js";
import { ClientUser } from "./types/user";
import MobileDetect from "mobile-detect";

const STORAGE_KEY = "color-mode";
const savedMode = (localStorage.getItem(STORAGE_KEY) as ColorMode) ?? ColorMode.SYSTEM;

const StoreContext = createContext<StoreContextType>();

export const StoreContextProvider = (props: { children: JSXElement }) => {
	const [activities, activitiesSet] = createSignal<ActivityCollectionItem[]>([]);
	const [claims, claimsSet] = createSignal<ClaimCollectionItem[]>([]);
	const [colorMode, colorModeSet] = createSignal<ColorMode>(savedMode);
	const [isAuthenticated, isAuthenticatedSet] = createSignal(false);
	const [user, userSet] = createSignal<ClientUser>({
		created: "",
		email: "",
		id: ""
	});
	const [weapons, weaponsSet] = createSignal<WeaponCollectionItem[]>([]);
	const [working, workingSet] = createSignal<boolean>(false);

	const [isMobile, setIsMobile] = createSignal(false);

	createEffect(() => {
		localStorage.setItem(STORAGE_KEY, colorMode());
	});

	onMount(() => {
		const md = new MobileDetect(window.navigator.userAgent);
		setIsMobile(md.phone() !== null);
	});

	const storeContextValue = {
		activities,
		activitiesSet,
		claims,
		claimsSet,
		colorMode,
		colorModeSet,
		isAuthenticated,
		isAuthenticatedSet,
		isMobile,
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
