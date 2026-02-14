import { checkLicenseExpiry } from "~/utilities";
import { Callout } from "~/components";
import { Component, createMemo, JSXElement, Match, Show, Switch } from "solid-js";
import { IconAlertCircle, IconAlertTriangle, IconInfoCircle } from "@tabler/icons-solidjs";

interface WeaponLicenseExpireWarningProps {
	endDate?: string;
	details?: string | JSXElement;
}

export const WeaponLicenseExpireWarning: Component<WeaponLicenseExpireWarningProps> = (props) => {
	const licenseWarning = createMemo(() => checkLicenseExpiry(props.endDate));

	return (
		<Show when={licenseWarning()} keyed>
			{(warning) => {
				const iconSize = "size-5"

				return (
					<Callout
						variant={warning.severity}
						class="flex gap-4 py-4"
					>
						<Switch
						>
							<Match when={warning.severity === "error"}>
								<IconAlertCircle class={iconSize} />
							</Match>
							<Match when={warning.severity === "warning"}>
								<IconAlertTriangle class={iconSize} />
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
