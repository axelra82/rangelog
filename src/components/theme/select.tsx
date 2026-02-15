import {
	IconDeviceLaptop,
	IconMoon,
	IconSun,
} from "@tabler/icons-solidjs";
import { useStore } from "~/store";
import { ColorMode } from "~/types";
import { Component, For } from "solid-js";
import { ToggleGroup, ToggleGroupItem } from "~/components/ui/toggle-group";

export const ThemeSelect: Component = () => {
	const { colorMode, colorModeSet } = useStore();

	const themes = [
		{ value: "light" as ColorMode, icon: IconSun },
		{ value: "dark" as ColorMode, icon: IconMoon },
		{ value: "system" as ColorMode, icon: IconDeviceLaptop },
	];

	return (
		<ToggleGroup
			value={colorMode()}
			onChange={(value) => {
				if (value) {
					colorModeSet(value as ColorMode);
				}
			}}
			class="justify-start"
		>
			<For each={themes}>
				{(theme) => {
					const Icon = theme.icon;
					return (
						<ToggleGroupItem
							// class="p-0 m-0 flex gap-1 justify-between"
							size="sm"
							value={theme.value}
							aria-label={`${theme.value} mode`}
						>
							<Icon class="size-4" />
						</ToggleGroupItem>
					);
				}}
			</For>
		</ToggleGroup>
	);
};
