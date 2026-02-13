import { checkLicenseExpiry, cn } from "@/utilities";
import { Alert } from "@suid/material";
import { Component, createMemo, JSXElement, Show } from "solid-js";

interface WeaponLicenseExpireWarningProps {
	endDate?: string;
	details?: string | JSXElement;
}

export const WeaponLicenseExpireWarning: Component<WeaponLicenseExpireWarningProps> = (props) => {
	const licenseWarning = createMemo(() => checkLicenseExpiry(props.endDate));

	return (
		<Show when={licenseWarning()} keyed>
			{(warning) => (
				<Alert severity={warning.severity}>
					<span class={cn({
						"mr-1": props.details,
					})}>
						{props.details}
					</span>
					<span>
						{warning.message}
					</span>
				</Alert>
			)}
		</Show>
	);
}
