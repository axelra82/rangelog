import {
	cn,
	licenseExpiryStatusMessage,
} from "~/utilities";

import {
	Callout,
	Icon,
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "~/components";

import {
	Icons,
} from "~/types";

import {
	Component,
	createMemo,
	createSignal,
	JSXElement,
	Match,
	onMount,
	Show,
	Switch,
} from "solid-js";

interface WeaponLicenseExpireWarningProps {
	endDate?: string;
	details?: string | JSXElement;
}

export const WeaponLicenseExpireWarning: Component<WeaponLicenseExpireWarningProps> = (props) => {
	const licenseWarning = createMemo(() => licenseExpiryStatusMessage(props.endDate));

	return (
		<Show when={licenseWarning()} keyed>
			{(warning) => {
				const iconSize = "size-5"

				return (
					<Callout
						variant={warning.status}
						class="flex gap-4 py-4"
					>
						<Switch
						>
							<Match when={warning.status === "error"}>
								<Icon
									icon={Icons.ALERT_CIRCLE}
									class={iconSize}
								/>
							</Match>
							<Match when={warning.status === "warning"}>
								<Icon
									icon={Icons.ALERT_TRIANGLE}
									class={iconSize}
								/>
							</Match>
						</Switch>
						<div>
							<Show when={props.details}>
								<span class="mr-1">{props.details}</span>
							</Show>
							{warning.message}
						</div>
					</Callout>
				);
			}}
		</Show>
	);
};

interface LicenseExpiryIndicatorProps {
	licenseEnd?: string;
	size?: number;
}

export const LicenseExpiryIndicator: Component<LicenseExpiryIndicatorProps> = (props) => {
	const result = licenseExpiryStatusMessage(props.licenseEnd);

	const [size, sizeSet] = createSignal("size-5");

	onMount(() => {
		if (props.size) {
			sizeSet(`size-${props.size}`);
		}
	});

	return (
		<Show when={result} keyed>
			{(item) => (
				<Popover>
					<PopoverTrigger as="div" class="inline-flex items-center gap-1 cursor-pointer">
						<Show
							when={item.status === "error"}
							fallback={
								<Icon
									icon={Icons.ALERT_TRIANGLE}
									class={cn(
										"text-orange-500",
										size(),
									)}
								/>
							}
						>
							<Icon
								icon={Icons.ALERT_CIRCLE}
								class={cn(
									"text-red-500",
									size(),
								)} />
						</Show>
					</PopoverTrigger>
					<PopoverContent class={cn(
						item.status === "error" ? "bg-error" : "bg-warning",
					)}>
						<p class={cn(
							"text-sm",
							item.status === "error" ? "text-error-foreground" : "text-warning-foreground",
						)}>
							{item.message}
						</p>
					</PopoverContent>
				</Popover>
			)}
		</Show>
	);
};
