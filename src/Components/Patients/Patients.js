import { makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
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
	const classes = useStyles();
	return (
		<>
			<div className={classes.header}>
				<Typography variant="h4">All patients</Typography>
				<NewPatient />
			</div>
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
