import { Component, For, Show } from "solid-js";
import { cn } from "~/utilities";

interface PaletteProps {
	colors?: string[];
	gradients?: (number | string)[];
}

const colors = [
	"blue",
	"green",
	"orange",
	"red",
];

export const Palette: Component<PaletteProps> = (props) => {
	const getTextColor = (gradient: number) => {
		// Lighter shades (50-400) typically need dark text
		// Darker shades (500-900) typically need light text
		return gradient <= 400 ? "text-gray-900" : "text-white";
	};

	return (
		<section>
			<For each={props.colors ?? colors}>
				{(color) => {
					const gradients = props.gradients ?? [
						50,
						100,
						200,
						300,
						400,
						500,
						600,
						700,
						800,
						900,
					];

					return (
						<div>
							<strong>{color}</strong>
							<ul class="flex gap-2 my-2">
								<For each={gradients}>
									{(gradient) => {
										const isTwoToned = typeof gradient === "string";
										const controlledGradient = gradient === "" ? `oklch(var(--${color}))` : `oklch(var(--${color}-${gradient}))`;

										return (
											<div
												style={{
													"background-color": isTwoToned ? controlledGradient : `oklch(var(--${color}-${gradient}))`,
												}}
												class="size-12 flex items-center justify-center rounded">
												<Show when={!isTwoToned}>
													<div class={cn(
														"text-xs",
														getTextColor(gradient as number),
													)}>
														{gradient}
													</div>
												</Show>
											</div>
										);
									}}
								</For>
							</ul>
						</div>
					);
				}}
			</For>
		</section>
	);
}
