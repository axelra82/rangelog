import {
	Component,
	createSignal,
} from "solid-js";
import { timestampToLocaleDate } from "~/utilities";
import {
	Box,
	IconButton,
} from "@suid/material";

import ContentCopyIcon from "@suid/icons-material/ContentCopy";
import MoreHorizIcon from "@suid/icons-material/MoreHoriz";
// import GitHubIcon from "@suid/icons-material/GitHub";

import {
	Severity
} from "../../types";
import { ParentComponent } from "solid-js";
import { pushSnackbar } from "../dialogue/snackbar-stack";
import GitHubIcon from "../@suid/icons-material/GitHub";

export const LayoutBottomBar: ParentComponent = (props) => {
	const environment = import.meta.env;
	const buildHash = environment.VITE_APP_BUILD;
	const buildTime = environment.VITE_APP_BUILD_TIME;
	const buildVersion = environment.VITE_APP_VERSION;
	const repo = environment.VITE_APP_REPO;

	const RepoReference: Component = () => (
		<IconButton onClick={() => window.open(repo, "_blank", "noopener,noreferrer")}>
			<GitHubIcon fontSize="small" />
		</IconButton>
	);

	const BuildReference: Component = () => {
		const [revealHash, revealHashSet] = createSignal(false);

		const copyToClipboard = async (text: string) => {
			await navigator.clipboard.writeText(text);
			pushSnackbar({
				message: "Hash copied",
				severity: Severity.INFO,
				autoHideDuration: 3000,
			});
		};

		return (
			<div>
				<strong>{revealHash() ? buildHash : buildHash.slice(0, 8)}</strong>
				<IconButton
					onClick={() => revealHashSet((prev) => !prev)}
					size="small"
				>
					<MoreHorizIcon fontSize="small" />
				</IconButton>
				<IconButton
					onClick={() => copyToClipboard(buildHash)}
					size="small"
				>
					<ContentCopyIcon fontSize="small" />
				</IconButton>
			</div>
		);
	}

	const BuildVersionDate: Component = () => (
		<div>
			<strong class="mr-2">{buildVersion}</strong>
			{timestampToLocaleDate(buildTime)}
		</div>
	);

	return (
		<Box
			component="aside"
			sx={{
				display: "flex",
				alignItems: "center",
				justifyContent: "flex-end",
				px: 2,
				py: 1,
				gap: 2,
				backgroundColor: (theme) => theme.palette.background.paper,
				borderTop: 1,
				borderColor: (theme) => theme.palette.divider,
				// text-sm equivalent
				fontSize: "0.875rem",
			}}
		>
			<RepoReference />
			<BuildReference />
			<BuildVersionDate />
		</Box>
	);
}
