import {
	IconDeviceLaptop,
	IconMoon,
	IconSun,
} from "@tabler/icons-solidjs";
import { Component, For } from "solid-js";

import { ToggleGroup, ToggleGroupItem } from "~/components/ui/toggle-group";
import { useStore } from "~/store";
import { UserTheme } from "~/types";
import { cn } from "~/utilities";

export const ThemeSelect: Component = () => {
	const {
		colorMode,
		colorModeSet,
		isMobile,
	} = useStore();

	const themes = [
		{ value: "light" as UserTheme, icon: IconSun },
		{ value: "dark" as UserTheme, icon: IconMoon },
		{ value: "system" as UserTheme, icon: IconDeviceLaptop },
	];

	return (
		<ToggleGroup
			value={colorMode()}
			onChange={(value) => {
				if (value) {
					colorModeSet(value as UserTheme);
				}
			}}
			class="justify-start"
		>
			<For each={themes}>
				{(theme) => {
					const Icon = theme.icon;
					return (
						<ToggleGroupItem
							value={theme.value}
							aria-label={`${theme.value} mode`}
							{...isMobile() && { size: "sm" }}
						>
							<Icon class={cn(
								isMobile() ? "size-5" : "size-4",
							)}
							/>
						</ToggleGroupItem>
					);
				}}
			</For>
		</ToggleGroup>
	);
};
