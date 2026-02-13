import { BackendProvider, ProviderFunction } from "~/types/data-provider";
import { createPocketbaseProvider } from "./pocketbase";

export const providers: Record<BackendProvider, () => ProviderFunction> = {
	[BackendProvider.POCKETBASE]: createPocketbaseProvider,
};
