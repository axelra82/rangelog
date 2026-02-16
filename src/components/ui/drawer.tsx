import { createSignal, JSXElement, ParentComponent, Show } from "solid-js";
import { Portal } from "solid-js/web";
import { Button } from "~/components";
import { IconX } from "@tabler/icons-solidjs";

export interface DrawerControl {
	open: () => void;
	close: () => void;
	toggle: () => void;
	isOpen: () => boolean;
}

interface DrawerProps {
	title: string | JSXElement;
	ref: (control: DrawerControl) => void;
}

export const Drawer: ParentComponent<DrawerProps> = (props) => {
	const [open, openSet] = createSignal(false);

	const handleClose = () => {
		openSet(false);
	};

	const control: DrawerControl = {
		open: () => openSet(true),
		close: () => openSet(false),
		toggle: () => openSet(!open()),
		isOpen: () => open(),
	};

	// Expose control methods to parent
	props.ref?.(control);

	return (
		<Show when={open()}>
			<Portal>
				<div
					class="fixed inset-0 bg-black/50 z-40 transition-opacity"
					onClick={handleClose}
				/>

				<div class="fixed right-0 top-0 bottom-0 w-full max-w-md bg-background border-l border-border z-50 overflow-y-auto animate-in slide-in-from-right">
					<div class="p-6 space-y-6">
						<div class="flex items-start justify-between">
							<div>
								<h2>{props.title}</h2>
							</div>
							<Button
								variant="ghost"
								size="icon"
								onClick={handleClose}
							>
								<IconX class="size-4" />
							</Button>
						</div>
						{props.children}
					</div>
				</div>
			</Portal>
		</Show>
	);
};
