import { ParentComponent } from "solid-js";

interface LayoutMainContentProps {
	list?: any;
};

export const LayoutMainContent: ParentComponent<LayoutMainContentProps> = (props) => {
	return (
		<main class="grow p-4 overflow-auto max-w-4xl w-full mx-auto">
			{props.children}
		</main>
	);
}
