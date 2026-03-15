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
		theme,
		themeSet,
		isMobile,
	} = useStore();

	const themes = [
		{ value: "light" as UserTheme, icon: IconSun },
		{ value: "dark" as UserTheme, icon: IconMoon },
		{ value: "system" as UserTheme, icon: IconDeviceLaptop },
	];

	return (
		<ToggleGroup
			value={theme()}
			onChange={(value) => {
				if (value) {
					themeSet(value as UserTheme);
				}
			}}
			class="justify-start"
		>
			<For each={themes}>
				{(availableTheme) => {
					const Icon = availableTheme.icon;
					return (
						<ToggleGroupItem
							value={availableTheme.value}
							aria-label={`${availableTheme.value} theme`}
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
