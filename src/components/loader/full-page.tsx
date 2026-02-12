import { Component } from "solid-js";
import { Box, CircularProgress, Typography } from "@suid/material";

export const FullPageLoader: Component<{ message?: string }> = (props) => {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				width: "100vw",
				height: "100vh",
				bgcolor: "background.default",
				gap: 2,
			}}
		>
			<CircularProgress size={48} />
			{props.message && (
				<Typography marginTop={2} variant="body2" color="text.secondary">
					{props.message}
				</Typography>
			)}
		</Box>
	);
};
