import { Button, CircularProgress, makeStyles } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React from "react";
import { connect } from "react-redux";
import { isMobile } from "react-device-detect";
import * as actions from "actions";

const useStyles = makeStyles((theme) => ({
	verificationAlert: {
		padding: theme.spacing(2),
	},
}));

const EmailVerificationAlert = ({ verificationLoading, sendVerification }) => {
	const handleVerificationEmail = () => {
		sendVerification();
	};

	const classes = useStyles();

	return (
		<div className={classes.verificationAlert}>
			<Alert
				variant="filled"
				severity="warning"
				action={
					verificationLoading ? (
						<CircularProgress color="inherit" />
					) : (
						<Button color="inherit" onClick={handleVerificationEmail}>
							{isMobile ? "Resend Email" : "Resend verification email"}
						</Button>
					)
				}
			>
				Your email has not been verified. Please verify your email!
			</Alert>
		</div>
	);
};

const mapStateToProps = ({ auth }) => ({
	verificationLoading: auth.verifyEmail.loading,
});

const mapDispatchToProps = {
	sendVerification: actions.verifyEmail,
};

export default connect(mapStateToProps, mapDispatchToProps)(EmailVerificationAlert);
