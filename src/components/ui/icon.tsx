import {
	IconAlertCircle,
	IconAlertOctagon,
	IconAlertTriangle,
	IconBookFilled,
	IconBrandGithub,
	IconCheck,
	IconClipboardDataFilled,
	IconCopy,
	IconDots,
	IconExclamationCircle,
	IconEye,
	IconEyeOff,
	IconHexagonNumber1Filled,
	IconHexagonNumber2Filled,
	IconHexagonNumber3Filled,
	IconHomeFilled,
	IconLogout,
	IconPlus,
	IconSelector,
	IconUser,
	IconUserFilled,
	IconX,
	IconXboxX,
} from "@tabler/icons-solidjs"
import { Component, JSX, splitProps } from "solid-js"
import { Icons } from "~/types"

const iconMap: Record<Icons, Component<JSX.SvgSVGAttributes<SVGSVGElement>>> = {
	[Icons.ALERT_CIRCLE]: IconAlertCircle,
	[Icons.ALERT_OCTAGON]: IconAlertOctagon,
	[Icons.ALERT_TRIANGLE]: IconAlertTriangle,
	[Icons.BOOK_FILLED]: IconBookFilled,
	[Icons.BRAND_GITHUB]: IconBrandGithub,
	[Icons.CHECK]: IconCheck,
	[Icons.CLIPBOARD_DATA_FILLED]: IconClipboardDataFilled,
	[Icons.COPY]: IconCopy,
	[Icons.DOTS]: IconDots,
	[Icons.EXCLAMATION_CIRCLE]: IconExclamationCircle,
	[Icons.EYE_OFF]: IconEyeOff,
	[Icons.EYE]: IconEye,
	[Icons.HEXAGON_NUMBER_1_FILLED]: IconHexagonNumber1Filled,
	[Icons.HEXAGON_NUMBER_2_FILLED]: IconHexagonNumber2Filled,
	[Icons.HEXAGON_NUMBER_3_FILLED]: IconHexagonNumber3Filled,
	[Icons.HOME_FILLED]: IconHomeFilled,
	[Icons.LOGOUT]: IconLogout,
	[Icons.PLUS]: IconPlus,
	[Icons.SELECTOR]: IconSelector,
	[Icons.USER_FILLED]: IconUserFilled,
	[Icons.USER]: IconUser,
	[Icons.X]: IconX,
	[Icons.XboxX]: IconXboxX,
}

interface IconProps extends JSX.SvgSVGAttributes<SVGSVGElement> {
	icon: Icons
}

export const Icon: Component<IconProps> = (props) => {
	const [local, others] = splitProps(props, ["class", "icon"]);

	const ResolvedIcon = iconMap[local.icon];

	return (
		<ResolvedIcon
			class={local.class}
			{...others}
		/>
	);
}
