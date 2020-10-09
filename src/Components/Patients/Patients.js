import { makeStyles, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import CustomSnackbar from "../CustomSnackbar/CustomSnackbar";
import NewPatient from "../NewPatient/NewPatient";

const useStyles = makeStyles((theme) => ({
	header: {
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
		paddingBottom: theme.spacing(2),
	},
}));

const Patients = () => {
	const [showSnackbar, setShowSnackbar] = useState(false);
	const classes = useStyles();
	const handleAddedSuccessfully = () => {
		setShowSnackbar(true);
	};
	return (
		<>
			<div className={classes.header}>
				<Typography variant="h4">All patients</Typography>
				<NewPatient handleShowSuccessSnackbar={() => handleAddedSuccessfully()} />
			</div>
			<CustomSnackbar
				show={showSnackbar}
				// error={verificationError}
				// loading={verificationLoading}
				closeSnackbar={() => setShowSnackbar(false)}
				message="Verification email has been sent to your email."
			/>
		</>
	);
};

const mapStateToProps = ({ firebase, firestore }) => ({
	userId: firebase.auth.uid,
	patients: firestore.ordered.patients,
	requesting: firestore.status.requesting,
	requested: firestore.status.requested,
});

const mapDispatchToProps = {};

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	firestoreConnect((props) => [`patients/${props.userId}/patients`])
)(Patients);
