import { Component } from "solid-js";
import { cn } from "~/utilities";
import { Separator } from "~/components";

interface SpinnerProps {
	size?: "sm" | "md" | "lg" | "xl";
	variant?: "primary" | "secondary" | "success" | "destructive" | "muted" | "white";
	class?: string;
}

export const Spinner: Component<SpinnerProps> = (props) => {
	const sizeClasses = {
		sm: "w-4 h-4",
		md: "w-6 h-6",
		lg: "w-12 h-12",
		xl: "w-24 h-24",
	};

	const variantClasses = {
		primary: "text-primary",
		secondary: "text-secondary",
		success: "text-green-600",
		destructive: "text-destructive",
		muted: "text-muted-foreground",
		white: "text-white",
	};

	return (
		<svg
			class={cn(
				"animate-spinner-rotate text-secondary",
				sizeClasses[props.size ?? "md"],
				variantClasses[props.variant ?? "primary"],
				props.class
			)}
			viewBox="0 0 50 50"
			role="status"
			aria-label="Loading"
		>
			<circle
				class="animate-spinner-dash stroke-current fill-none"
				cx="25"
				cy="25"
				r="20"
				stroke-width="7"
			/>
			<title>Loading...</title>
		</svg>
	);
};

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


export const LoadingIndicator: Component = () => (
	<>
		<Separator class="my-6" />
		<div class="flex flex-col gap-2 items-center">
			<Spinner variant="primary" />
			Hämtar
		</div>
	</>
);
