import { cn } from "@/utilities";
import { initials } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";
import {
	Component,
	JSXElement,
	mergeProps,
} from "solid-js";

interface AvatarInterface {
	imageSource?: string;
	class?: string;
	name?: string;
}

/**
	* Reusable avatar component. Size can be set using predefined values in interface. All sizes are in square `px`.
	*
	* @returns {JSXElement}
	*/
export const Avatar: Component<AvatarInterface> = (props): JSXElement => {
	const merged = mergeProps({
		imageSource: "",
		class: "",
		size: 40,
	}, props);

	return (
		<img
			src={
				merged.imageSource && !!merged.imageSource
					? merged.imageSource
					: createAvatar(initials, { seed: merged.name }).toDataUri()
			}
			class={cn(
				"rounded-full",
				merged.class,
			)}
			width={merged.size}
			height={merged.size}
			alt={`${merged.name} avatar`}
		/>
	);
};
