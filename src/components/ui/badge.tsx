import type { Component, ComponentProps } from "solid-js"
import { splitProps } from "solid-js"

import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"

import { cn } from "~/utilities"

const badgeVariants = cva(
	"inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
	{
		variants: {
			variant: {
				default: "border-transparent bg-primary text-primary-foreground",
				secondary: "border-transparent bg-secondary text-secondary-foreground",
				outline: "text-foreground",
				success: "border-success-foreground bg-success text-success-foreground",
				warning: "border-warning-foreground bg-warning text-warning-foreground",
				error: "border-error-foreground bg-error text-error-foreground",
				"outline-orange": "border-orange-500 text-orange-500",
				"outline-blue": "border-blue-300 text-blue-500",
				"outline-green": "border-green-300 text-green-500",
				"outline-teal": "border-teal-300 text-teal-500",
				"outline-lime": "border-lime-300 text-lime-500",
				"outline-violet": "border-violet-300 text-violet-500",
				"outline-purple": "border-purple-300 text-purple-500",
				"outline-pink": "border-pink-300 text-pink-500",
			}
		},
		defaultVariants: {
			variant: "default"
		}
	}
)

type BadgeProps = ComponentProps<"div"> &
	VariantProps<typeof badgeVariants> & {
		round?: boolean
	}

const Badge: Component<BadgeProps> = (props) => {
	const [local, others] = splitProps(props, ["class", "variant", "round"])
	return (
		<div
			class={cn(
				badgeVariants({ variant: local.variant }),
				local.round && "rounded-full",
				local.class
			)}
			{...others}
		/>
	)
}

export type { BadgeProps }
export { Badge, badgeVariants }
