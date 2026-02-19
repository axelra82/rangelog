import { Component, createSignal } from "solid-js";
import { timestampToLocaleDate } from "~/utilities";
import { Button } from "~/components/ui/button";
import { Icons } from "~/types";
import { Icon } from "../ui";

export const LoginFooter: Component = () => {
	const env = import.meta.env;
	const buildHash = env.VITE_RANGELOG_APP_BUILD;
	const buildTime = env.VITE_RANGELOG_APP_BUILD_TIME;
	const buildVersion = env.VITE_RANGELOG_APP_VERSION;
	const repo = env.VITE_RANGELOG_APP_REPO;

	const [revealHash, revealHashSet] = createSignal(false);
	const [copied, setCopied] = createSignal(false);

	const copyToClipboard = async (text: string) => {
		await navigator.clipboard.writeText(text);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<footer class="w-full pb-4">
			<div class="max-w-md mx-auto px-4">
				<div class="flex items-center justify-between text-sm text-muted-foreground">
					<div class="flex items-center gap-2">
						<Button
							variant="ghost"
							size="icon"
							class="h-8 w-8"
							onClick={() => window.open(repo, "_blank", "noopener,noreferrer")}
						>
							<Icon
								icon={Icons.BRAND_GITHUB}
								class="size-4"
							/>
						</Button>
						<span class="font-medium">{buildVersion}</span>
					</div>
					<div class="flex items-center gap-1">
						<span class="hidden sm:inline text-xs">
							{timestampToLocaleDate(buildTime)}
						</span>
						<Button
							variant="ghost"
							size="icon"
							class="h-8 w-8"
							onClick={() => revealHashSet((prev) => !prev)}
						>
							<Icon
								icon={Icons.DOTS}
								class="size-3"
							/>
						</Button>
						<Button
							variant="ghost"
							size="icon"
							class="h-8 w-8"
							onClick={() => copyToClipboard(buildHash)}
							title={copied() ? "Copied!" : "Copy hash"}
						>
							<Icon
								icon={Icons.COPY}
								class="size-3"
							/>
						</Button>
					</div>
				</div>
				{revealHash() && (
					<div class="mt-2 text-xs text-center text-muted-foreground font-mono">
						{buildHash}
					</div>
				)}
			</div>
		</footer>
	);
};
