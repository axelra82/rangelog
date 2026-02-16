import { ParentComponent } from "solid-js";
import { useStore } from "~/store";
import { cn } from "~/utilities";

export const LayoutMainContent: ParentComponent = (props) => {
	const {
		isMobile
	} = useStore();

	return (
		<main class={cn(
			"flex-1 overflow-auto w-full",
			{
				"pb-24": isMobile(),
			}
		)
		}>
			<div class="p-4 max-w-4xl mx-auto">
				{props.children}

			</div>
		</main>
	);
};
