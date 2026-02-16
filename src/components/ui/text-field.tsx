import type { Component, ValidComponent } from "solid-js"
import { mergeProps, splitProps } from "solid-js"

import type { PolymorphicProps } from "@kobalte/core"
import * as TextFieldPrimitive from "@kobalte/core/text-field"
import { cva } from "class-variance-authority"

import { cn } from "~/utilities"

type TextFieldRootProps<T extends ValidComponent = "div"> =
	TextFieldPrimitive.TextFieldRootProps<T> & {
		class?: string | undefined
	}

const TextField = <T extends ValidComponent = "div">(
	props: PolymorphicProps<T, TextFieldRootProps<T>>
) => {
	const [local, others] = splitProps(props as TextFieldRootProps, ["class"])
	return <TextFieldPrimitive.Root class={cn("flex flex-col gap-1", local.class)} {...others} />
}

type TextFieldInputProps<T extends ValidComponent = "input"> =
	TextFieldPrimitive.TextFieldInputProps<T> & {
		class?: string | undefined
		type?:
		| "button"
		| "checkbox"
		| "color"
		| "date"
		| "datetime-local"
		| "email"
		| "file"
		| "hidden"
		| "image"
		| "month"
		| "number"
		| "password"
		| "radio"
		| "range"
		| "reset"
		| "search"
		| "submit"
		| "tel"
		| "text"
		| "time"
		| "url"
		| "week"
	}

const TextFieldInput = <T extends ValidComponent = "input">(
	rawProps: PolymorphicProps<T, TextFieldInputProps<T>>
) => {
	const props = mergeProps<TextFieldInputProps<T>[]>({ type: "text" }, rawProps)
	const [local, others] = splitProps(props as TextFieldInputProps, ["type", "class"])
	return (
		<TextFieldPrimitive.Input
			type={local.type}
			class={cn(
				"flex h-10 w-full rounded-md border border-border bg-transparent px-3 py-2 text-base md:text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 data-invalid:border-error-foreground data-invalid:text-error-foreground",
				local.class
			)}
			{...others}
		/>
	)
}

type TextFieldTextAreaProps<T extends ValidComponent = "textarea"> =
	TextFieldPrimitive.TextFieldTextAreaProps<T> & { class?: string | undefined }

const TextFieldTextArea = <T extends ValidComponent = "textarea">(
	props: PolymorphicProps<T, TextFieldTextAreaProps<T>>
) => {
	const [local, others] = splitProps(props as TextFieldTextAreaProps, ["class"])
	return (
		<TextFieldPrimitive.TextArea
			class={cn(
				"flex min-h-20 w-full rounded-md border border-border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
				local.class
			)}
			{...others}
		/>
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

type TextFieldLabelProps<T extends ValidComponent = "label"> =
	TextFieldPrimitive.TextFieldLabelProps<T> & { class?: string | undefined }

const TextFieldLabel = <T extends ValidComponent = "label">(
	props: PolymorphicProps<T, TextFieldLabelProps<T>>
) => {
	const [local, others] = splitProps(props as TextFieldLabelProps, ["class"])
	return <TextFieldPrimitive.Label class={cn(labelVariants(), local.class)} {...others} />
}

type TextFieldDescriptionProps<T extends ValidComponent = "div"> =
	TextFieldPrimitive.TextFieldDescriptionProps<T> & {
		class?: string | undefined
	}

const TextFieldDescription = <T extends ValidComponent = "div">(
	props: PolymorphicProps<T, TextFieldDescriptionProps<T>>
) => {
	const [local, others] = splitProps(props as TextFieldDescriptionProps, ["class"])
	return (
		<TextFieldPrimitive.Description
			class={cn(labelVariants({ variant: "description" }), local.class)}
			{...others}
		/>
	)
}

type TextFieldErrorMessageProps<T extends ValidComponent = "div"> =
	TextFieldPrimitive.TextFieldErrorMessageProps<T> & {
		class?: string | undefined
	}

const TextFieldErrorMessage = <T extends ValidComponent = "div">(
	props: PolymorphicProps<T, TextFieldErrorMessageProps<T>>
) => {
	const [local, others] = splitProps(props as TextFieldErrorMessageProps, ["class"])
	return (
		<TextFieldPrimitive.ErrorMessage
			class={cn(labelVariants({ variant: "error" }), local.class)}
			{...others}
		/>
	)
}

const TextFieldInputGridItem: Component<{
	key: string;
	onChange: (key: string, value: string) => void;
	required?: boolean;
	title: string;
	type: "text" | "date" | "datetime-local" | "email" | "month" | "number" | "password" | "search" | "tel" | "time" | "url" | "week";
	value: string;
}> = (props) => (
	<TextField
		value={props.value}
		onChange={(value) => props.onChange(props.key, value)}
		class="grid md:grid-cols-2 grid-cols-1"
		{...props.required && { required: true }}
	>
		<TextFieldLabel class="text-sm font-medium">
			{props.title}
			{props.required && " *"}
		</TextFieldLabel>
		<TextFieldInput type={props.type} />
	</TextField>
);

const TextFieldAreaGridItem: Component<{
	key: string;
	onChange: (key: string, value: string) => void;
	required?: boolean;
	title: string;
	value: string;
}> = (props) => (
	<TextField
		value={props.value}
		onChange={(value) => props.onChange(props.key, value)}
		class="grid md:grid-cols-2 grid-cols-1"
		{...props.required && { required: true }}
	>
		<TextFieldLabel class="text-sm font-medium">
			{props.title}
			{props.required && " *"}
		</TextFieldLabel>
		<TextFieldTextArea />
	</TextField>
);

export {
	TextField,
	TextFieldAreaGridItem,
	TextFieldDescription,
	TextFieldErrorMessage,
	TextFieldInput,
	TextFieldInputGridItem,
	TextFieldLabel,
	TextFieldTextArea,
}
