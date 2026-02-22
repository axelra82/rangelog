import {
	Component,
	createSignal,
	onMount,
	Show,
	Switch,
	Match,
	Accessor,
} from "solid-js";
import { FileCollectionItem, Icons } from "~/types";
import { file as fileApi } from "infrastructure";
import { viewFile, downloadFile, cn } from "~/utilities";
import { Button } from "./button";
import { Icon } from "./icon";
import { lookup } from "node:dns";


const ViewButton: Component<{
	file: FileCollectionItem,
	url: Accessor<string>,
}> = (props) => (
	<Button
		title={props.file.name}
		size="sm"
		onClick={() => viewFile(props.url())}
	>
		<Icon
			icon={Icons.EYE}
		/>
	</Button>
);

const DownloadButton: Component<{
	file: FileCollectionItem,
	url: Accessor<string>,
}> = (props) => (
	<Button
		title={props.file.name}
		size="sm"
		onClick={() => downloadFile(props.url(), props.file.name)}
	>
		<Icon
			icon={Icons.DOWNLOAD}
		/>
	</Button>
);

export const FileSource: Component<{
	double?: boolean,
	file?: FileCollectionItem,
	id?: string,
	image?: boolean,
	show?: boolean,
	size?: string;
}> = (props) => {
	const [url, urlSet] = createSignal("");
	const [file, fileSet] = createSignal<FileCollectionItem>();

	onMount(async () => {
		if (props.id) {
			const response = await fileApi.read({ id: props.id }) as
				FileCollectionItem;
			fileSet(response);
		} else {
			fileSet(props.file);
		}

		if (file()) {
			const resolved = await fileApi.getUrl(file()!);
			urlSet(resolved);
		} else {
			console.error("missing file");
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
						}
					)}
					src={props.size ? `${url()}&thumb=${props.size}` : url()}
				/>
			}
		>
			<Show when={file()} keyed>
				{(localFile) => (
					<div class="flex gap-4 items-center">
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
						<div class="text-sm text-muted-foreground break-all">
							{localFile.name}
						</div>
					</div>
				)}
			</Show>
		</Show >
	);
};
