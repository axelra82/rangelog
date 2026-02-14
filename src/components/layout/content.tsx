import { ParentComponent } from "solid-js";

export const LayoutMainContent: ParentComponent = (props) => {
	return (
		<main class="flex-1 p-4 overflow-auto max-w-4xl w-full mx-auto">
			{props.children}
		</main>
	);
};
