import { Component, createSignal } from "solid-js";
import { timestampToLocaleDate } from "~/utilities";
import { IconBrandGithub, IconCopy, IconDots } from "@tabler/icons-solidjs";
import { Severity } from "~/types";
import { ParentComponent } from "solid-js";
import { pushSnackbar } from "~/components/dialogue/snackbar-stack";
import { Button } from "~/components/ui/button";

export const LayoutBottomBar: ParentComponent = () => {
	const environment = import.meta.env;
	const buildHash = environment.VITE_APP_BUILD;
	const buildTime = environment.VITE_APP_BUILD_TIME;
	const buildVersion = environment.VITE_APP_VERSION;
	const repo = environment.VITE_APP_REPO;

	const RepoReference: Component = () => (
		<Button
			variant="ghost"
			size="icon"
			onClick={() => window.open(repo, "_blank", "noopener,noreferrer")}
		>
			<IconBrandGithub class="size-4" />
		</Button>
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
			<div class="flex items-center gap-1">
				<strong class="text-sm">{revealHash() ? buildHash : buildHash.slice(0, 8)}</strong>
				<Button
					variant="ghost"
					size="icon"
					onClick={() => revealHashSet((prev) => !prev)}
				>
					<IconDots class="size-4" />
				</Button>
				<Button
					variant="ghost"
					size="icon"
					onClick={() => copyToClipboard(buildHash)}
				>
					<IconCopy class="size-4" />
				</Button>
			</div>
		);
	};

	const BuildVersionDate: Component = () => (
		<div class="text-sm">
			<strong class="mr-2">{buildVersion}</strong>
			{timestampToLocaleDate(buildTime)}
		</div>
	);

	return (
		<aside class="flex items-center justify-end px-4 py-2 gap-4 bg-background border-t border-border">
			<RepoReference />
			<BuildReference />
			<BuildVersionDate />
		</aside>
	);
};
