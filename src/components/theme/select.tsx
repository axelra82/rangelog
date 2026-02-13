import {
	IconDeviceLaptop,
	IconMoon,
	IconSun,
} from "@tabler/icons-solidjs";
import { useStore } from "~/store";
import { ColorMode } from "~/types";
import { ToggleButton, ToggleButtonGroup } from "@suid/material";
import { Component } from "solid-js";

export const ThemeSelect: Component = () => {
	const { colorMode, colorModeSet } = useStore();

	const handleChange = (
		_: unknown,
		value: ColorMode | null
	) => {
		if (value) {
			colorModeSet(value)
		};
	};

	return (
		<ToggleButtonGroup
			exclusive
			size="small"
			value={colorMode()}
			onChange={handleChange}
		>
			<ToggleButton value="light" size="small">
				<IconSun class="size-4" />
			</ToggleButton>
			<ToggleButton value="dark" size="small">
				<IconMoon class="size-4" />
			</ToggleButton>
			<ToggleButton value="system" size="small">
				<IconDeviceLaptop class="size-4" />
			</ToggleButton>
		</ToggleButtonGroup>
	);
}
