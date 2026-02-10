import { ColorMode } from "@/types";
import { Computer, DarkMode, LightMode } from "@suid/icons-material";
import { ToggleButton, ToggleButtonGroup } from "@suid/material";
import { Accessor, Component, Setter } from "solid-js";

interface ThemeSelectProps {
	colorMode: Accessor<ColorMode>;
	setColorMode: Setter<ColorMode>;
}

export const ThemeSelect: Component<ThemeSelectProps> = (props) => {
	const handleChange = (
		_: unknown,
		value: ColorMode | null
	) => {
		if (value) {
			props.setColorMode(value)
		};
	};

	return (
		<ToggleButtonGroup
			exclusive
			size="small"
			value={props.colorMode()}
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
