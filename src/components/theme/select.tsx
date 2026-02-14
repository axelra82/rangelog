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
						<ToggleGroupItem value={theme.value} aria-label={`${theme.value} mode`}>
							<Icon class="size-4" />
						</ToggleGroupItem>
					);
				}}
			</For>
		</ToggleGroup>
	);
};
// import {
// 	IconDeviceLaptop,
// 	IconMoon,
// 	IconSun,
// } from "@tabler/icons-solidjs";
// import { useStore } from "~/store";
// import { ColorMode } from "~/types";
// import { ToggleButton, ToggleButtonGroup } from "@suid/material";
// import { Component } from "solid-js";

// export const ThemeSelect: Component = () => {
// 	const { colorMode, colorModeSet } = useStore();

// 	const handleChange = (
// 		_: unknown,
// 		value: ColorMode | null
// 	) => {
// 		if (value) {
// 			colorModeSet(value)
// 		};
// 	};

// 	return (
// 		<ToggleButtonGroup
// 			exclusive
// 			size="small"
// 			value={colorMode()}
// 			onChange={handleChange}
// 		>
// 			<ToggleButton value="light" size="small">
// 				<IconSun class="size-4" />
// 			</ToggleButton>
// 			<ToggleButton value="dark" size="small">
// 				<IconMoon class="size-4" />
// 			</ToggleButton>
// 			<ToggleButton value="system" size="small">
// 				<IconDeviceLaptop class="size-4" />
// 			</ToggleButton>
// 		</ToggleButtonGroup>
// 	);
// }
