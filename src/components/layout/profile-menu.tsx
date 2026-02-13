import { Logout } from "@suid/icons-material";
import { Menu, MenuItem, ListItemIcon, Divider } from "@suid/material";
import { auth } from "../../../infrastructure/services";
import { Accessor, Component, Setter } from "solid-js";
import { useStore } from "~/store";
import { ThemeSelect } from "../theme";

interface ProfileMenuProps {
	open: Accessor<boolean>;
	anchorEl: Accessor<null | HTMLElement>
	anchorElSet: Setter<null | HTMLElement>
}

export const ProfileMenu: Component<ProfileMenuProps> = (props) => {
	const store = useStore();

	const handleClose = () => props.anchorElSet(null);
	const handleLogout = () => {
		const done = auth.logout();

		if (done) {
			store.isAuthenticatedSet(false);
		}
	};

	return (<Menu
		anchorEl={props.anchorEl()}
		id="account-menu"
		open={props.open()}
		onClose={handleClose}
		onClick={handleClose}
		PaperProps={{
			elevation: 0,
			sx: {
				overflow: "visible",
				filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
				mt: 1.5,
				["& .MuiAvatar-root"]: {
					width: 32,
					height: 32,
					ml: -0.5,
					mr: 1,
				},
				"&:before": {
					content: '""',
					display: "block",
					position: "absolute",
					top: 0,
					right: 14,
					width: 10,
					height: 10,
					bgcolor: "background.paper",
					transform: "translateY(-50%) rotate(45deg)",
					zIndex: 0,
				},
			},
		}}
		transformOrigin={{
			horizontal: "right",
			vertical: "top",
		}}
		anchorOrigin={{
			horizontal: "right",
			vertical: "bottom",
		}}
	>
		<MenuItem>
			<ThemeSelect />
		</MenuItem>
		<Divider />
		<MenuItem onClick={handleLogout}>
			<ListItemIcon>
				<Logout fontSize="small" />
			</ListItemIcon>
			Logout
		</MenuItem>
	</Menu>);
}
