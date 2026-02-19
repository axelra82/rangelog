import { Component, createSignal } from "solid-js";
import { timestampToLocaleDate } from "~/utilities";
import {
	Button,
	Icon,
	showToast,
} from "~/components";
import { Icons } from "~/types";

export const AppDetails: Component = () => {
	const env = import.meta.env;
	const buildHash = env.VITE_RANGELOG_APP_BUILD;
	const buildTime = env.VITE_RANGELOG_APP_BUILD_TIME;
	const buildVersion = env.VITE_RANGELOG_APP_VERSION;
	const repo = env.VITE_RANGELOG_APP_REPO;

	const RepoReference: Component = () => (
		<Button
			variant="ghost"
			size="icon"
			onClick={() => window.open(repo, "_blank", "noopener,noreferrer")}
		>
			<Icon
				icon={Icons.BRAND_GITHUB}
				class="size-4"
			/>
		</Button>
	);

	const BuildReference: Component = () => {
		const [revealHash, revealHashSet] = createSignal(false);

		const copyToClipboard = async (text: string) => {
			await navigator.clipboard.writeText(text);
			showToast({
				title: "Copied",
				description: "Hash copied to clipboard",
				variant: "success",
				duration: 3000,
			});
		};

		return (
			<div class="flex items-center gap-1">
				<Button
					variant="ghost"
					size="icon"
					onClick={() => copyToClipboard(buildHash)}
				>
					<Icon
						icon={Icons.COPY}
						class="size-4"
					/>
				</Button>
				<strong>{revealHash() ? buildHash : buildHash.slice(0, 8)}</strong>
				<Button
					variant="ghost"
					size="icon"
					onClick={() => revealHashSet((prev) => !prev)}
				>
					<Icon
						icon={Icons.DOTS}
						class="size-4"
					/>
				</Button>
			</div>
		);
	};

	const BuildVersionDate: Component = () => (
		<div>
			version: <strong class="mr-2">{buildVersion}</strong>
			{timestampToLocaleDate(buildTime)}
		</div>
	);

	return (
		<ul class="text-sm text-muted-foreground md:flex gap-2 items-center">
			<li>
				<BuildVersionDate />
			</li>
			<li class="flex items-center gap-2">
				<RepoReference />
				<BuildReference />
			</li>
		</ul>
	);
};
