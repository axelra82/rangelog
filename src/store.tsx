import MobileDetect from "mobile-detect";
import {
	createContext,
	createEffect,
	createSignal,
	JSXElement,
	onMount,
	useContext,
} from "solid-js";

import { UserLanguage } from "./i18n";
import { Activity, Claim, Weapon } from "./schemas";
import { ClientUser } from "./schemas/user";
import { StoreContextProps, UserTheme } from "./types";

const USER_THEME_STORAGE_KEY = "user-theme";
export const USER_LANGUAGE_STORAGE_KEY = "user-language";

const savedTheme = (localStorage.getItem(USER_THEME_STORAGE_KEY) as UserTheme) ?? UserTheme.SYSTEM;
const savedLanguage = (localStorage.getItem(USER_LANGUAGE_STORAGE_KEY) as UserLanguage) ?? "en";

const StoreContext = createContext<StoreContextProps>();

export const StoreContextProvider = (props: { children: JSXElement }) => {
	const [activities, activitiesSet] = createSignal<Activity[]>([]);
	const [activitiesTotal, activitiesTotalSet] = createSignal(0);
	const [activitiesPageCount, activitiesPageCountSet] = createSignal(-1);
	const [activitiesCurrentPage, activitiesCurrentPageSet] = createSignal(1);

	const [claims, claimsSet] = createSignal<Claim[]>([]);
	const [claimsTotal, claimsTotalSet] = createSignal(0);
	const [claimsPageCount, claimsPageCountSet] = createSignal(-1);
	const [claimsCurrentPage, claimsCurrentPageSet] = createSignal(1);

	const [theme, themeSet] = createSignal<UserTheme>(savedTheme);
	const [language, languageSet] = createSignal<UserLanguage>(savedLanguage);

	const [isAuthenticated, isAuthenticatedSet] = createSignal(false);
	const [user, userSet] = createSignal<ClientUser>({
		activities: 0,
		claims: 0,
		created: "",
		email: "",
		id: "",
		weapons: 0,
	});
	const [weapons, weaponsSet] = createSignal<Weapon[]>([]);
	const [working, workingSet] = createSignal<boolean>(false);

	const [isMobile, setIsMobile] = createSignal(false);

	createEffect(() => {
		localStorage.setItem(USER_THEME_STORAGE_KEY, theme());
	});

	onMount(() => {
		const md = new MobileDetect(window.navigator.userAgent);
		setIsMobile(md.phone() !== null);
	});

	const storeContextValue = {
		activities,
		activitiesCurrentPage,
		activitiesCurrentPageSet,
		activitiesPageCount,
		activitiesPageCountSet,
		activitiesSet,
		activitiesTotal,
		activitiesTotalSet,
		claims,
		claimsCurrentPage,
		claimsCurrentPageSet,
		claimsPageCount,
		claimsPageCountSet,
		claimsSet,
		claimsTotal,
		claimsTotalSet,
		isAuthenticated,
		isAuthenticatedSet,
		isMobile,
		language,
		languageSet,
		theme,
		themeSet,
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
