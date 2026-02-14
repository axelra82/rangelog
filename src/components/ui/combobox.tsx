import type { Component, JSX, ValidComponent } from "solid-js"
import { createEffect, createSignal, For, Show, splitProps } from "solid-js"

import * as ComboboxPrimitive from "@kobalte/core/combobox"
import type { PolymorphicProps } from "@kobalte/core/polymorphic"

import { cn } from "~/utilities"
import { IconCheck, IconX } from "@tabler/icons-solidjs"
import { Label } from "./label"

const Combobox = ComboboxPrimitive.Root
const ComboboxItemLabel = ComboboxPrimitive.ItemLabel
const ComboboxHiddenSelect = ComboboxPrimitive.HiddenSelect

type ComboboxItemProps<T extends ValidComponent = "li"> = ComboboxPrimitive.ComboboxItemProps<T> & {
	class?: string | undefined
}

const ComboboxItem = <T extends ValidComponent = "li">(
	props: PolymorphicProps<T, ComboboxItemProps<T>>
) => {
	const [local, others] = splitProps(props as ComboboxItemProps, ["class"])
	return (
		<ComboboxPrimitive.Item
			class={cn(
				"relative flex cursor-default select-none items-center justify-between rounded-sm px-2 py-1.5 text-sm outline-none data-disabled:pointer-events-none data-highlighted:bg-accent data-highlighted:text-accent-foreground data-disabled:opacity-50",
				local.class
			)}
			{...others}
		/>
	)
}

type ComboboxItemIndicatorProps<T extends ValidComponent = "div"> =
	ComboboxPrimitive.ComboboxItemIndicatorProps<T> & {
		children?: JSX.Element
	}

const ComboboxItemIndicator = <T extends ValidComponent = "div">(
	props: PolymorphicProps<T, ComboboxItemIndicatorProps<T>>
) => {
	const [local, others] = splitProps(props as ComboboxItemIndicatorProps, ["children"])
	return (
		<ComboboxPrimitive.ItemIndicator {...others}>
			<Show
				when={local.children}
				fallback={
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
						<path d="M5 12l5 5l10 -10" />
					</svg>
				}
			>
				{(children) => children()}
			</Show>
		</ComboboxPrimitive.ItemIndicator>
	)
}

type ComboboxSectionProps<T extends ValidComponent = "li"> =
	ComboboxPrimitive.ComboboxSectionProps<T> & { class?: string | undefined }

const ComboboxSection = <T extends ValidComponent = "li">(
	props: PolymorphicProps<T, ComboboxSectionProps<T>>
) => {
	const [local, others] = splitProps(props as ComboboxSectionProps, ["class"])
	return (
		<ComboboxPrimitive.Section
			class={cn(
				"overflow-hidden p-1 px-2 py-1.5 text-xs font-medium text-muted-foreground ",
				local.class
			)}
			{...others}
		/>
	)
}

type ComboboxControlProps<
	U,
	T extends ValidComponent = "div"
> = ComboboxPrimitive.ComboboxControlProps<U, T> & {
	class?: string | undefined
}

const ComboboxControl = <T, U extends ValidComponent = "div">(
	props: PolymorphicProps<U, ComboboxControlProps<T>>
) => {
	const [local, others] = splitProps(props as ComboboxControlProps<T>, ["class"])
	return (
		<ComboboxPrimitive.Control
			class={cn("flex h-10 items-center rounded-md border border-border px-3", local.class)}
			{...others}
		/>
	)
}

type ComboboxInputProps<T extends ValidComponent = "input"> =
	ComboboxPrimitive.ComboboxInputProps<T> & { class?: string | undefined }

const ComboboxInput = <T extends ValidComponent = "input">(
	props: PolymorphicProps<T, ComboboxInputProps<T>>
) => {
	const [local, others] = splitProps(props as ComboboxInputProps, ["class"])
	return (
		<ComboboxPrimitive.Input
			class={cn(
				"flex size-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
				local.class
			)}
			{...others}
		/>
	)
}

type ComboboxTriggerProps<T extends ValidComponent = "button"> =
	ComboboxPrimitive.ComboboxTriggerProps<T> & {
		class?: string | undefined
		children?: JSX.Element
	}

const ComboboxTrigger = <T extends ValidComponent = "button">(
	props: PolymorphicProps<T, ComboboxTriggerProps<T>>
) => {
	const [local, others] = splitProps(props as ComboboxTriggerProps, ["class", "children"])
	return (
		<ComboboxPrimitive.Trigger class={cn("size-4 opacity-50", local.class)} {...others}>
			<ComboboxPrimitive.Icon>
				<Show
					when={local.children}
					fallback={
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
							<path d="M8 9l4 -4l4 4" />
							<path d="M16 15l-4 4l-4 -4" />
						</svg>
					}
				>
					{(children) => children()}
				</Show>
			</ComboboxPrimitive.Icon>
		</ComboboxPrimitive.Trigger>
	)
}

type ComboboxContentProps<T extends ValidComponent = "div"> =
	ComboboxPrimitive.ComboboxContentProps<T> & { class?: string | undefined }

const ComboboxContent = <T extends ValidComponent = "div">(
	props: PolymorphicProps<T, ComboboxContentProps<T>>
) => {
	const [local, others] = splitProps(props as ComboboxContentProps, ["class"])
	return (
		<ComboboxPrimitive.Portal>
			<ComboboxPrimitive.Content
				class={cn(
					"relative z-50 min-w-32 max-h-80 overflow-y-auto rounded-md border border-border bg-popover text-popover-foreground shadow-md animate-in fade-in-80",
					local.class
				)}
				{...others}
			>
				<ComboboxPrimitive.Listbox class="m-0 p-1" />
			</ComboboxPrimitive.Content>
		</ComboboxPrimitive.Portal>
	)
}

const ComboboxMultiSelectGridItem: Component<{
	key: string;
	onChange: (key: string, value: string[]) => void;
	options: string[];
	placeholder: string;
	required?: boolean;
	title: string;
	value: string[];
}> = (props) => {

	const [showPlaceholder, showPlaceholderSet] = createSignal<boolean>(true);

	return (
		<div class="grid md:grid-cols-2 grid-cols-1">
			<label class="text-sm font-medium">
				{props.title}
				{props.required && " *"}
			</label>
			<Combobox<string>
				multiple
				{...props.required && { required: true }}
				options={props.options}
				value={props.value} // Use the value passed from parent
				onChange={(value: string[]) => props.onChange(props.key, value)}
				{...showPlaceholder() && { placeholder: props.placeholder }}
				itemComponent={itemProps => (
					<ComboboxItem item={itemProps.item}>
						<div class="flex">
							<div class="w-6 shrink">
								<ComboboxItemIndicator>
									<IconCheck class="size-4 opacity-35" />
								</ComboboxItemIndicator>
							</div>
							<ComboboxItemLabel>{itemProps.item.rawValue}</ComboboxItemLabel>
						</div>
					</ComboboxItem>
				)}
			>
				<ComboboxControl<string>
					class="flex overflow-hidden h-auto items-baseline"
					aria-label={props.title}
				>
					{state => {
						createEffect(() => {
							showPlaceholderSet(state.selectedOptions().length === 0);
						});

						return (
							<>
								<div class={cn(
									"flex flex-wrap gap-2 grow",
									{
										"p-2": state.selectedOptions().length,
									}
								)}>
									<For each={state.selectedOptions()}>
										{option => (
											<div
												class="bg-accent text-sm px-2 py-0.5 rounded inline-flex items-center gap-x-2"
												onPointerDown={(event) => event.stopPropagation()}
											>
												{option}
												<IconX
													onClick={() => state.remove(option)}
													class="size-3 hover:opacity-80"
												/>
											</div>
										)}
									</For>
									<Show when={state.selectedOptions().length === 0}>
										<ComboboxInput class="border-none focus:ring-0 text-base md:text-sm" />
									</Show>
								</div>
								<ComboboxTrigger />
							</>
						);
					}}
				</ComboboxControl>
				<ComboboxContent />
			</Combobox>
		</div>
	);
};

export {
	Combobox,
	ComboboxContent,
	ComboboxControl,
	ComboboxHiddenSelect,
	ComboboxInput,
	ComboboxItem,
	ComboboxItemIndicator,
	ComboboxItemLabel,
	ComboboxSection,
	ComboboxTrigger,
	ComboboxMultiSelectGridItem,
}
