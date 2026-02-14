// src/components/ui/spinner.tsx
import { Component } from "solid-js";
import { cn } from "~/utilities";

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
