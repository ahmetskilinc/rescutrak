import { Slide, Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React from "react";

const CustomSnackbar = ({ show, error, message = "", closeSnackbar, loading }) => {
	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		closeSnackbar();
	};
	return (
		<Snackbar
			open={show && !loading}
			autoHideDuration={6000}
			onClose={handleClose}
			TransitionComponent={(props) => <Slide {...props} direction="up" />}
		>
			<Alert onClose={handleClose} severity={error ? "error" : "success"}>
				{error ? error : message}
			</Alert>
		</Snackbar>
	);
};

export default CustomSnackbar;
