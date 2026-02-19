import type { Component, JSX, ValidComponent } from "solid-js"
import { For, Show, splitProps } from "solid-js"

import type { PolymorphicProps } from "@kobalte/core/polymorphic"
import * as SelectPrimitive from "@kobalte/core/select"
import { cva } from "class-variance-authority"

import { cn } from "~/utilities"
import { Icon, Label } from "~/components"
import { Icons } from "~/types"

const Select = SelectPrimitive.Root
const SelectValue = SelectPrimitive.Value
const SelectHiddenSelect = SelectPrimitive.HiddenSelect

type SelectTriggerProps<T extends ValidComponent = "button"> =
	SelectPrimitive.SelectTriggerProps<T> & {
		class?: string | undefined
		children?: JSX.Element
	}

const SelectTrigger = <T extends ValidComponent = "button">(
	props: PolymorphicProps<T, SelectTriggerProps<T>>
) => {
	const [local, others] = splitProps(props as SelectTriggerProps, ["class", "children"])
	return (
		<SelectPrimitive.Trigger
			class={cn(
				"flex h-10 w-full items-center justify-between rounded-md border border-border bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
				local.class
			)}
			{...others}
		>
			{local.children}
			<SelectPrimitive.Icon
				as="svg"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="size-4 opacity-50"
			>
				<path d="M8 9l4 -4l4 4" />
				<path d="M16 15l-4 4l-4 -4" />
			</SelectPrimitive.Icon>
		</SelectPrimitive.Trigger>
	)
}

type SelectContentProps<T extends ValidComponent = "div"> =
	SelectPrimitive.SelectContentProps<T> & { class?: string | undefined }

const SelectContent = <T extends ValidComponent = "div">(
	props: PolymorphicProps<T, SelectContentProps<T>>
) => {
	const [local, others] = splitProps(props as SelectContentProps, ["class"])
	return (
		<SelectPrimitive.Portal>
			<SelectPrimitive.Content
				class={cn(
					"relative z-50 min-w-32 overflow-hidden rounded-md border border-border bg-popover text-popover-foreground shadow-md animate-in fade-in-80",
					local.class
				)}
				{...others}
			>
				<SelectPrimitive.Listbox class="m-0 p-1" />
			</SelectPrimitive.Content>
		</SelectPrimitive.Portal>
	)
}

type SelectItemProps<T extends ValidComponent = "li"> = SelectPrimitive.SelectItemProps<T> & {
	class?: string | undefined
	children?: JSX.Element
}

const SelectItem = <T extends ValidComponent = "li">(
	props: PolymorphicProps<T, SelectItemProps<T>>
) => {
	const [local, others] = splitProps(props as SelectItemProps, ["class", "children"])
	return (
		<SelectPrimitive.Item
			class={cn(
				"relative mt-0 flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50",
				local.class
			)}
			{...others}
		>
			<SelectPrimitive.ItemIndicator class="absolute right-2 flex size-3.5 items-center justify-center">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="size-4"
				>
					<path stroke="none" d="M0 0h24v24H0z" fill="none" />
					<path d="M5 12l5 5l10 -10" />
				</svg>
			</SelectPrimitive.ItemIndicator>
			<SelectPrimitive.ItemLabel>{local.children}</SelectPrimitive.ItemLabel>
		</SelectPrimitive.Item>
	)
}

const labelVariants = cva(
	"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
	{
		variants: {
			variant: {
				label: "data-[invalid]:text-destructive",
				description: "font-normal text-muted-foreground",
				error: "text-xs text-destructive"
			}
		},
		defaultVariants: {
			variant: "label"
		}
	}
)

type SelectLabelProps<T extends ValidComponent = "label"> = SelectPrimitive.SelectLabelProps<T> & {
	class?: string | undefined
}

const SelectLabel = <T extends ValidComponent = "label">(
	props: PolymorphicProps<T, SelectLabelProps<T>>
) => {
	const [local, others] = splitProps(props as SelectLabelProps, ["class"])
	return <SelectPrimitive.Label class={cn(labelVariants(), local.class)} {...others} />
}

type SelectDescriptionProps<T extends ValidComponent = "div"> =
	SelectPrimitive.SelectDescriptionProps<T> & {
		class?: string | undefined
	}

const SelectDescription = <T extends ValidComponent = "div">(
	props: PolymorphicProps<T, SelectDescriptionProps<T>>
) => {
	const [local, others] = splitProps(props as SelectDescriptionProps, ["class"])
	return (
		<SelectPrimitive.Description
			class={cn(labelVariants({ variant: "description" }), local.class)}
			{...others}
		/>
	)
}

type SelectErrorMessageProps<T extends ValidComponent = "div"> =
	SelectPrimitive.SelectErrorMessageProps<T> & {
		class?: string | undefined
	}

const SelectErrorMessage = <T extends ValidComponent = "div">(
	props: PolymorphicProps<T, SelectErrorMessageProps<T>>
) => {
	const [local, others] = splitProps(props as SelectErrorMessageProps, ["class"])
	return (
		<SelectPrimitive.ErrorMessage
			class={cn(labelVariants({ variant: "error" }), local.class)}
			{...others}
		/>
	)
}

type SelectNativeProps = JSX.SelectHTMLAttributes<HTMLSelectElement> & {
	class?: string;
	multiple?: boolean;
}

const SelectNative = (props: SelectNativeProps) => {
	const [local, others] = splitProps(props, ["class", "multiple"])
	return (
		<div class="relative w-full">
			<select
				{...local.multiple && { multiple: true }}
				class={cn(
					"flex w-full appearance-none items-center rounded-md border border-border bg-transparent pr-8 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
					!local.multiple && "h-10",
					local.class
				)}
				{...others}
			/>
			<Show when={!local.multiple}>
				<Icon
					icon={Icons.SELECTOR}
					class="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 opacity-50"
				/>
			</Show>
		</div>
	)
}

const SelectGridItem: Component<{
	key: string;
	multiple?: boolean;
	onChange: (key: string, value: string) => void;
	options: string[];
	placeholder: string;
	required?: boolean;
	title: string;
	value: string | string[];
}> = (props) => (
	<div class="grid md:grid-cols-2 grid-cols-1">
		<Label class="text-sm font-medium">
			{props.title}
			{props.required && " *"}
		</Label>
		<SelectNative
			{...props.multiple && { multiple: true }}
			value={props.value}
			onChange={(event) => props.onChange(props.key, event.target.value ?? "")}
		>
			<Show when={!props.multiple}>
				<option disabled>
					{props.placeholder}
				</option>
			</Show>
			<For each={props.options}>
				{(option) => (
					<option value={option}>{option}</option>
				)}
			</For>
		</SelectNative>
	</div>
);

export {
	Select,
	SelectContent,
	SelectDescription,
	SelectErrorMessage,
	SelectGridItem,
	SelectHiddenSelect,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,

	SelectNative,
}
