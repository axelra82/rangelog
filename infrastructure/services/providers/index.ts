import { BackendProvider, ProviderFunction } from "~/types/service-provider";
import { createPocketbaseProvider } from "./pocketbase";

export const providers: Record<BackendProvider, () => ProviderFunction> = {
	[BackendProvider.POCKETBASE]: createPocketbaseProvider,
};
