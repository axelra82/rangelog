import { CreateWeaponForm } from "@/components/weapons/create";
import { weapon } from "../../infrastructure/services";
import { createEffect, createSignal, For, onMount, Show } from "solid-js";
import { ReadListResponse, WeaponCollectionItem } from "@/types";

type ListData = ReadListResponse<WeaponCollectionItem>;

export const WeaponsPage = () => {
	const [weaponsData, weaponsDataSet] = createSignal<ListData>();

	onMount(async () => {
		const data = await weapon.read({}) as ListData;
		weaponsDataSet(data);
	});

	return (
		<section>
			<For each={weaponsData()?.items}>
				{(data) => {
					return (
						<>
							<br />
							<br />
							{data.name}
							<br />
							{data.brand}
							<br />
							{data.model}
						</>
					);
				}}
			</For>
			<CreateWeaponForm />
		</section>
	);
}

export default WeaponsPage;
