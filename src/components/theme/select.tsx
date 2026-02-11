import { useStore } from "@/store";
import { ColorMode } from "@/types";
import { Computer, DarkMode, LightMode } from "@suid/icons-material";
import { ToggleButton, ToggleButtonGroup } from "@suid/material";
import { Component } from "solid-js";

export const ThemeSelect: Component = () => {
	const { colorMode, setColorMode } = useStore();

	const handleChange = (
		_: unknown,
		value: ColorMode | null
	) => {
		if (value) {
			setColorMode(value)
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
				<LightMode fontSize="small" />
			</ToggleButton>
			<ToggleButton value="dark" size="small">
				<DarkMode fontSize="small" />
			</ToggleButton>

			<ToggleButton value="system" size="small">
				<Computer fontSize="small" />
			</ToggleButton>
		</ToggleButtonGroup>
	);
}
