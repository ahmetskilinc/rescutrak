import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import { connect } from "react-redux";
import * as actions from "actions";

const CustomSnackbar = ({ snackbarOpen, snackbarMessage, snackbarType, closeSnackbar }) => {
	const handleClose = (reason) => {
		if (reason === "clickaway") {
			return;
		}
		closeSnackbar();
	};

	return (
		<Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleClose}>
			<Alert elevation={6} onClose={handleClose} variant="filled" severity={snackbarType}>
				{snackbarMessage}
			</Alert>
		</Snackbar>
	);
};
const mapStateToProps = ({ snackbar }) => ({
	snackbarOpen: snackbar.snackbarOpen,
	snackbarMessage: snackbar.snackbarMessage,
	snackbarType: snackbar.snackbarType,
});

const mapDispatchToProps = {
	closeSnackbar: actions.closeSnackbar,
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomSnackbar);
