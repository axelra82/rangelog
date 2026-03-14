import { useSearchParams } from "@solidjs/router";
import {
	weapons as weaponsApi,
} from "infrastructure";
import {
	Component,
	createMemo,
	createSignal,
	For,
	Match,
	onMount,
	Show,
	Switch,
} from "solid-js";

import {
	Button,
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	FileSource,
	LicenseExpiryIndicator,
	Separator,
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	showToast,
} from "~/components";
import {
	AppFile,
	Weapon,
} from "~/schemas";
import { useStore } from "~/store";
import { cn, dateTimeLocale, t } from "~/utilities";

export interface DetailsControl {
	open: () => void;
	close: () => void;
	isOpen: () => boolean;
}

interface WeaponDetailsProps {
	weapon: Weapon;
	ref: (control: DetailsControl) => void;
}

interface DetailItemProps {
	isDate?: boolean;
	isFile?: boolean;
	isUrl?: boolean;
	key: string;
	value?: string | string[] | number | AppFile[];
}

const DetailItem: Component<DetailItemProps> = (item) => {
	const isNote = createMemo(() => item.key === "Anteckningar");
	const isDate = createMemo(() => item.value !== "" && item.isDate);
	const isPrice = createMemo(() => item.key === "Pris" && typeof item.value === "number");
	const isImage = createMemo(() => item.isFile && item.key === "" && item.value);
	const isDocument = createMemo(() => item.key !== "" && item.isFile);
	const isEntry = createMemo(() => !isImage && !isDocument && item.key !== "");

	return (
		<Switch>
			<Match when={isEntry()}>
				<div class={cn(
					"flex gap-2",
					{
						"flex-col": isNote(),
					},
				)}
				>
					<span class="text-muted-foreground">
						{item.key}
					</span>

					<span class={cn(
						{
							"font-medium": !isNote(),
							"whitespace-pre-wrap": isNote() || item.isUrl,
						},
					)}
					>
						<Switch fallback="-">

							<Match when={isDate()}>
								{dateTimeLocale({
									dateTime: item.value as string,
								})}
							</Match>

							<Match when={isPrice() && (item.value as number) > 0}>
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
				</div>
			</Match>

			<Match when={isDocument()}>
				<Show when={Array.isArray(item.value) && item.value.length}>
					<div>
						<Separator class="mb-8" />
						<div class="flex flex-col space-y-6">
							<For each={item.value as AppFile[]}>
								{(file) => {
									return (
										<div class="flex gap-2">
											<FileSource file={file} double />
										</div>
									);
								}}
							</For>
						</div>
					</div>
				</Show>
			</Match>

			<Match when={isImage()}>
				<FileSource
					image
					id={item.value as string}
				/>
			</Match>
		</Switch>
	);
};

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

	const [_, setSearchParams] = useSearchParams();
	const [items, itemsSet] = createSignal<DetailItemProps[]>([]);

	const editWeapon = (weapon: Weapon) => {
		control.close();
		setSearchParams({ edit: weapon.id });
	};

	const deleteWeapon = async (id: string, name: string) => {
		try {
			const response = await weaponsApi.delete(id);

			if (!response) {
				throw Error("DELETE WEAPON FAILED");
			}

			weaponsSet((prev) => prev.filter((item) => item.id !== id));
			control.close();

			showToast({
				description: `${name} togs bort från vapenboken`,
				variant: "success",
				duration: 3000,
			});
		} catch (error) {
			console.error(error);

			showToast({
				description: `${name} kunde inte raderas`,
				variant: "error",
				duration: 3000,
			});
		}
	};

	onMount(() => {
		// Expose control methods to parent
		props.ref?.(control);

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
				value: (props.weapon.caliber || []).join(", "),
			},
			{
				key: "Förbund",
				value: props.weapon.federation,
			},
			{
				key: "Skytteform",
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
					)}
				>
					<SheetHeader>
						<SheetTitle class="flex flex-col items-start space-y-1">
							<div class="flex items-center gap-2 text-2xl">
								<LicenseExpiryIndicator size={10} licenseEnd={props.weapon.licenseEnd} /> {props.weapon.name}
							</div>
							<div class="text-xs text-muted-foreground font-light">
								{t("created")}
								{" "}
								{dateTimeLocale({
									dateTime: props.weapon.created,
								})}
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
							{t("edit")}
						</Button>

						<Dialog>
							<DialogTrigger
								as={Button}
								variant="destructive"
								class="flex-1 w-full"
							>
								{t("delete")}
							</DialogTrigger>
							<DialogContent class="max-w-sm">
								<DialogHeader>
									<DialogTitle>
										{t("component.weapon.detail.delete.title")}
									</DialogTitle>
								</DialogHeader>

								<DialogDescription>
									{t("component.weapon.detail.delete.description")}
								</DialogDescription>

								<DialogTrigger
									as={Button}
									variant="outline"
								>
									{t("cancel")}
								</DialogTrigger>

								<DialogTrigger
									as={Button}
									variant="destructive"
									onClick={() => deleteWeapon(props.weapon.id, props.weapon.name)}
								>
									{t("continue")}
								</DialogTrigger>
							</DialogContent>
						</Dialog>
					</div>

					<Button
						variant="outline"
						class="w-full"
						onClick={() => control.close()}
					>
						{t("close")}
					</Button>
				</SheetContent>
			</Sheet>
		</>
	);
};
