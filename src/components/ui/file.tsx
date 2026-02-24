import {
	Component,
	createSignal,
	onMount,
	Show,
	Switch,
	Match,
	Accessor,
} from "solid-js";
import { file as fileApi } from "infrastructure";
import { viewFile, downloadFile, cn } from "~/utilities";
import { Button } from "./button";
import { Icon } from "./icon";
import { AppFile } from "~/schemas";
import { Icons } from "~/types";

const ViewButton: Component<{
	file: AppFile,
	url: Accessor<string>,
}> = (props) => (
	<Button
		title={`open ${props.file.name}`}
		size="sm"
		onClick={() => viewFile(props.url())}
	>
		<Icon
			icon={Icons.EYE}
		/>
	</Button>
);

const DownloadButton: Component<{
	file: AppFile,
	url: Accessor<string>,
}> = (props) => (
	<Button
		title={`download ${props.file.name}`}
		size="sm"
		onClick={() => downloadFile(props.url(), props.file.name)}
	>
		<Icon
			icon={Icons.DOWNLOAD}
		/>
	</Button>
);

export const FileSource: Component<{
	class?: string;
	double?: boolean,
	file?: AppFile,
	id?: string,
	image?: boolean,
	show?: boolean,
	size?: string;
}> = (props) => {
	const [url, urlSet] = createSignal("");
	const [file, fileSet] = createSignal<AppFile>();

	onMount(async () => {
		if (props.id) {
			const response = await fileApi.read({ id: props.id }) as
				AppFile;
			fileSet(response);
		} else {
			fileSet(props.file);
		}

		if (file()) {
			try {
				const resolved = await fileApi.getUrl(file()!);

				if (resolved && resolved.trim().length > 0) {
					urlSet(resolved);
				} else {
					console.error("URL was not generated or came back empty.");
				}
			} catch (error) {
				console.error(error);
			}
		} else {
			console.error("Missing file.");
			return;
		}
	});

	return (
		<Show
			when={!props.image && file()}
			fallback={
				<img
					class={cn(
						"w-full object-contain",
						{
							"max-h-64": !props.size,
						},
						props.class,
					)}
					src={props.size ? `${url()}&thumb=${props.size}` : url()}
				/>
			}
		>
			<Show when={file()} keyed>
				{(localFile) => (
					<div class={cn(
						"flex gap-4 items-center",
						props.class,
					)}>
						<Switch fallback={
							<DownloadButton file={localFile} url={url} />
						}>
							<Match when={props.double}>
								<DownloadButton file={localFile} url={url} />
								<ViewButton file={localFile} url={url} />
							</Match>
							<Match when={props.show}>
								<ViewButton file={localFile} url={url} />
							</Match>
						</Switch>
						<div class={cn(
							"text-sm text-muted-foreground break-all",
							props.class,
						)}>
							{localFile.name}
						</div>
					</div>
				)}
			</Show>
		</Show >
	);
};
