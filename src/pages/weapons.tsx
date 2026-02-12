import { CreateWeaponForm } from "@/components/weapons/create";
import { For } from "solid-js";
import { useStore } from "@/store";
import { WeaponItem } from "@/components/weapons";

export const WeaponsPage = () => {
	const {
		weapons,
	} = useStore();

	return (
		<section>
			<For each={weapons()}>
				{(data) => {
					return (
						<WeaponItem {...data} />
					);
				}}
			</For>
			<CreateWeaponForm />
		</section>
	);
}

export default WeaponsPage;
