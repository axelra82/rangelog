import { ParentComponent } from "solid-js";

interface LayoutMainContentProps {
	list?: any;
};

export const LayoutMainContent: ParentComponent<LayoutMainContentProps> = (props) => {
	return (
		<main class="grow p-4 overflow-auto mx-auto md:w-5xl">
			{props.children}
		</main>
	);
}
