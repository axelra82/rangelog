import { licenseExpiryStatusMessage } from "~/utilities";
import { Callout } from "~/components";
import { Component, createMemo, JSXElement, Match, Show, Switch } from "solid-js";
import { IconAlertCircle, IconAlertTriangle } from "@tabler/icons-solidjs";

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
								<IconAlertCircle class={iconSize} />
							</Match>
							<Match when={warning.status === "warning"}>
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
