
import { BackendProvider, ProviderFunction } from "@/types/data-provider";
import { providers } from "./providers";

export const createProvider = (): ProviderFunction => {
	const dataProvider = import.meta.env.VITE_DATA_PROVIDER as BackendProvider;

	const providerFactory = providers[dataProvider];

	if (!providerFactory) {
		throw new Error(`Provider ${dataProvider} not implemented`);
	}

	return providerFactory();
};
