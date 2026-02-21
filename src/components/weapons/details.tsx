import { useSearchParams } from "@solidjs/router";
import { weapons } from "infrastructure/services";
import {
	Component,
	createSignal,
	For,
	Match,
	onMount,
	Show,
	Switch,
} from "solid-js";
import {
	DialogTitle,
	DialogContent,
	Button,
	Dialog,
	DialogDescription,
	DialogHeader,
	DialogTrigger,
	LicenseExpiryIndicator,
	Separator,
	showToast,
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	Icon,
} from "~/components";
import { useStore } from "~/store";
import { Icons, type FileCollectionItem, type WeaponCollectionItem } from "~/types";
import { cn, isoDateTimeToDateInput } from "~/utilities";
import { file as fileApi } from "infrastructure";
import { downloadFile } from "~/utilities/general";

export interface DetailsControl {
	open: () => void;
	close: () => void;
	isOpen: () => boolean;
}

export interface DetailsControl {
	open: () => void;
	close: () => void;
	isOpen: () => boolean;
}

interface WeaponDetailsProps {
	weapon: WeaponCollectionItem;
	ref: (control: DetailsControl) => void;
}

interface DetailItemProps {
	isDate?: boolean;
	isFile?: boolean;
	isUrl?: boolean;
	key: string;
	value?: string | string[] | number | FileCollectionItem[];
}

export const WeaponDetails: Component<WeaponDetailsProps> = (props) => {
	const {
		isMobile,
		weaponsSet,
	} = useStore();

	const [open, openSet] = createSignal(false);

	const control: DetailsControl = {
		open: () => openSet(true),
		close: () => openSet(false),
		isOpen: () => open(),
	};

	// Expose control methods to parent
	props.ref?.(control);

	const [_, setSearchParams] = useSearchParams();
	const [items, itemsSet] = createSignal<DetailItemProps[]>([]);
	let detailsControl: DetailsControl | undefined;

	const FileSource: Component<{
		file: FileCollectionItem,
		image?: boolean,
	}> = (props) => {
		const [url, urlSet] = createSignal("");

		onMount(async () => {
			const resolved = await fileApi.getUrl(props.file);
			urlSet(resolved);
		});

		return (
			<Show
				when={!props.image}
				fallback={
					<img
						class="w-full max-h-64"
						src={url()}
					/>
				}
			>
				<div class="flex gap-4 items-center">
					<Button
						onClick={() => downloadFile(url(), props.file.name)}
						title={props.file.name}
					>
						<Icon
							icon={Icons.DOWNLOAD}
						/>
					</Button>
					<div class="text-sm text-muted-foreground break-all">
						{props.file.name}
					</div>
				</div>
			</Show>
		);
	};

	const DetailItem: Component<DetailItemProps> = (item) => {
		const isNote = item.key === "Anteckningar";
		const isDate = item.value !== "" && item.isDate;
		const isPrice = item.key === "Pris" && typeof item.value === "number";
		const isImage = item.key === "" && item.isFile;
		const isDocument = item.key !== "" && item.isFile;
		const isEntry = !isImage && !isDocument;

		return (
			<div class={cn(
				"flex gap-2",
				{
					"flex-col": isNote,
				}
			)}>
				<Show when={isEntry}>
					<span class="text-muted-foreground">
						{item.key}:
					</span>
				</Show>

				<Switch>
					<Match when={isEntry}>
						<span class={cn(
							{
								"font-medium": !isNote,
								"whitespace-pre-wrap": isNote || item.isUrl,
							}
						)}>
							<Switch fallback="-">

								<Match when={isDate}>
									{isoDateTimeToDateInput(item.value as string)}
								</Match>

								<Match when={isPrice}>
									{new Intl.NumberFormat("sv-SE", {
										// Use navigator.language later.
										style: "currency",
										currency: "SEK",
									}).format(item.value as number)}
								</Match>

								<Match when={item.isUrl}>
									<a
										href={`${item.value}`}
										rel="noopener noreferrer"
										target="_blank"
										class="break-all"
									>
										{(item.value as string).replace(/^[a-z]+:\/\/(www\.)?/i, "")}
									</a>
								</Match>

								<Match when={typeof item.value === "string"}>
									{item.value as string}
								</Match>

							</Switch>
						</span>
					</Match>

					<Match when={isDocument}>
						<Show when={Array.isArray(item.value) && item.value.length}>
							<div class="flex flex-col space-y-6">
								<For each={item.value as FileCollectionItem[]}>
									{(file) => <FileSource file={file} />}
								</For>
							</div>
						</Show>
					</Match>

					<Match when={isImage}>
						<FileSource
							file={item.value as unknown as FileCollectionItem}
							image
						/>
					</Match>
				</Switch>
			</div>
		)
	};

	const editWeapon = (weapon: WeaponCollectionItem) => {
		detailsControl?.close();
		setSearchParams({ edit: weapon.id });
	};

	const deleteWeapon = (id: string, name: string) => {
		weapons.delete(id);
		showToast({
			title: "Raderat",
			description: `${name} togs bort från vapenboken`,
			variant: "warning",
			duration: 3000,
		});

		weaponsSet((prev) => prev.filter((item) => item.id !== id));
		detailsControl?.close();
		detailsControl?.close();
	};

	onMount(() => {
		itemsSet([
			{
				key: "Typ",
				value: props.weapon.type,
			},
			{
				key: "Tillverkare",
				value: props.weapon.brand,
			},
			{
				isUrl: true,
				key: "Produktlänk",
				value: props.weapon.manufacturerUrl,
			},
			{
				key: "Modell",
				value: props.weapon.model,
			},
			{
				isDate: true,
				key: "Licens fr.o.m",
				value: props.weapon.licenseStart,
			},
			{
				isDate: true,
				key: "Licens giltitg t.o.m",
				value: props.weapon.licenseEnd,
			},
			{
				key: "Serienummer",
				value: props.weapon.serialNumber,
			},
			{
				key: "Pipa",
				value: props.weapon.barrelLength,
			},
			{
				key: "Kaliber",
				value: props.weapon.caliber.join(", "),
			},
			{
				key: "Förbund",
				value: props.weapon.federation,
			},
			{
				key: "Vapengrupp",
				value: props.weapon.classification,
			},
			{
				isDate: true,
				key: "Inköpsdatum",
				value: props.weapon.purchaseDate,
			},
			{
				key: "Pris",
				value: props.weapon.price,
			},
			{
				key: "Säljare",
				value: props.weapon.seller,
			},
			{
				isUrl: true,
				key: "Länk till säljare",
				value: props.weapon.sellerUrl,
			},
			{
				key: "Anteckningar",
				value: props.weapon.notes,
			},
			{
				isFile: true,
				key: "",
				value: props.weapon.image,
			},
			{
				isFile: true,
				key: "Dokument",
				value: props.weapon.expand?.documents,
			},
		]);
	});

	return (
		<>
			<Sheet
				open={open()}
				onOpenChange={openSet}
			>
				<SheetContent
					position="right"
					class={cn(
						"space-y-6",
						isMobile() ? "border-l-0" : "",
					)}>
					<SheetHeader>
						<SheetTitle class="flex flex-col items-start space-y-1">
							<div class="flex items-center gap-2 text-2xl">
								<LicenseExpiryIndicator size={10} licenseEnd={props.weapon.licenseEnd} /> {props.weapon.name}
							</div>
							<div class="text-xs text-muted-foreground font-light">
								Skapad {isoDateTimeToDateInput(props.weapon.created)}
							</div>
						</SheetTitle>
					</SheetHeader>
					<For each={items()}>
						{(item) => <DetailItem {...item} />}
					</For>

					<Separator class="my-4" />

					<div class="flex gap-4 pt-4">
						<Button
							variant="default"
							class="flex-1"
							onClick={() => {
								editWeapon(props.weapon);
								control.close();
							}}
						>
							Redigera
						</Button>

						<Dialog>
							<DialogTrigger
								as={Button}
								variant="destructive"
								class="flex-1 w-full"
							>
								Ta bort
							</DialogTrigger>
							<DialogContent class="max-w-sm">
								<DialogHeader>
									<DialogTitle>
										Är du säker på att du vill radera {props.weapon.name}?
									</DialogTitle>
								</DialogHeader>

								<DialogDescription>
									Detta kommer att ta bort vapnet permanent. Denna åtgärd kan inte ångras.
								</DialogDescription>

								<DialogTrigger
									as={Button}
									variant="outline"
								>
									Avbryt
								</DialogTrigger>

								<DialogTrigger
									as={Button}
									variant="destructive"
									onClick={() => deleteWeapon(props.weapon.id, props.weapon.name)}
								>
									Fortsätt
								</DialogTrigger>
							</DialogContent>
						</Dialog>
					</div>


					<Button
						variant="outline"
						class="w-full"
						onClick={() => control.close()}
					>
						Stäng
					</Button>
				</SheetContent>
			</Sheet>
		</>
	);
};
