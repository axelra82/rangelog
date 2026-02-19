import {
	ActivityCollectionItem,
	ClaimCollectionItem,
	StoreContextProps,
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

const StoreContext = createContext<StoreContextProps>();

export const StoreContextProvider = (props: { children: JSXElement }) => {
	const [activities, activitiesSet] = createSignal<ActivityCollectionItem[]>([]);
	const [activitiesTotal, activitiesTotalSet] = createSignal(0);
	const [activitiesPageCount, activitiesPageCountSet] = createSignal(-1);
	const [activitiesCurrentPage, activitiesCurrentPageSet] = createSignal(1);

	const [claims, claimsSet] = createSignal<ClaimCollectionItem[]>([]);
	const [claimsTotal, claimsTotalSet] = createSignal(0);
	const [claimsPageCount, claimsPageCountSet] = createSignal(-1);
	const [claimsCurrentPage, claimsCurrentPageSet] = createSignal(1);

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
		activitiesTotal,
		activitiesTotalSet,
		activitiesPageCount,
		activitiesPageCountSet,
		activitiesCurrentPage,
		activitiesCurrentPageSet,
		claims,
		claimsSet,
		claimsTotal,
		claimsTotalSet,
		claimsPageCount,
		claimsPageCountSet,
		claimsCurrentPage,
		claimsCurrentPageSet,
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
