import {
	QueryClient,
	QueryClientConfig,
	QueryClientProvider,
} from "@tanstack/solid-query";
import { SolidQueryDevtools } from "@tanstack/solid-query-devtools";
import { auth as authApi } from "infrastructure";
import { render } from "solid-js/web";

import { AuthChecker } from "./components/auth-checker";
import {
	StoreContextProvider,
} from "./store";

const queryOptions: QueryClientConfig = {
	defaultOptions: {
		queries: {
			gcTime: Infinity,
			refetchOnMount: false,
			refetchOnWindowFocus: false,
			retry: 1,
			staleTime: Infinity,
		},
	},
};

const queryClient = new QueryClient(queryOptions);

if (!window.location.pathname.startsWith("/_/") && !window.location.pathname.startsWith("/api/")) {
	authApi.refresh();

	render(
		() => (
			<QueryClientProvider client={queryClient}>
				<SolidQueryDevtools buttonPosition="bottom-left" />
				<StoreContextProvider>
					<AuthChecker />
				</StoreContextProvider>
			</QueryClientProvider>
		),
		document.getElementById("root") as HTMLElement,
	);
}
