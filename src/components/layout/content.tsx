import { ParentComponent } from "solid-js";

export const LayoutMainContent: ParentComponent = (props) => {
	return (
		<main class="flex-1 overflow-auto w-full">
			<div class="p-4 max-w-4xl mx-auto">
				{props.children}

			</div>
		</main>
	);
};
