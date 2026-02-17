import { Component } from "solid-js";
import { Spinner } from "~/components";

export const FullPageLoader: Component<{ message?: string }> = (props) => (
	<div class="flex flex-col justify-center items-center w-screen h-screen bg-background gap-2">
		<Spinner size="lg" />
		{props.message && (
			<p class="mt-2 text-sm text-muted-foreground">
				{props.message}
			</p>
		)}
	</div>
);
