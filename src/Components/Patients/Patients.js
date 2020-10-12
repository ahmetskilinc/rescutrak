import {
	CircularProgress,
	IconButton,
	makeStyles,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from "@material-ui/core";
import LaunchRoundedIcon from "@material-ui/icons/LaunchRounded";
import React, { useState } from "react";
import { connect, useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
import NewPatient from "../NewPatient/NewPatient";
import ViewPatient from "../ViewPatient/ViewPatient";

const useStyles = makeStyles((theme) => ({
	header: {
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
		paddingBottom: theme.spacing(2),
	},
}));

const Patients = ({ userId, requesting, requested }) => {
	const [currentViewPatient, setCurrentViewPatient] = useState(null);
	const [showViewPatientModal, setShowViewPatientModal] = useState(false);

	useFirestoreConnect([
		{
			collection: "patients",
			doc: userId,
			subcollections: [{ collection: "patients" }],
			storeAs: "patients",
		},
	]);

	const patients = useSelector(({ firestore: { ordered } }) => ordered.patients);

	const showPatientModal = (patient) => {
		setCurrentViewPatient(patient.id);
		setShowViewPatientModal(true);
	};

	const closePatientModal = () => {
		setCurrentViewPatient(null);
		setShowViewPatientModal(false);
	};

	const Content = () => {
		if (requested !== false && requesting !== true && patients) {
			if (patients.length < 1) {
				return <Typography>Nothing to see here</Typography>;
			} else {
				return (
					<>
						<TableContainer component={Paper}>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell>Name</TableCell>
										<TableCell>Status</TableCell>
										<TableCell>Species</TableCell>
										<TableCell>Colour</TableCell>
										<TableCell>Actions</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{patients.map((patient) => (
										<TableRow key={patient.id}>
											<TableCell>{patient.name}</TableCell>
											<TableCell>{patient.status}</TableCell>
											<TableCell>{patient.species}</TableCell>
											<TableCell>{patient.colour}</TableCell>
											<TableCell>
												<IconButton onClick={() => showPatientModal(patient)}>
													<LaunchRoundedIcon />
												</IconButton>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
						{showViewPatientModal && (
							<ViewPatient
								showModal={showViewPatientModal}
								close={closePatientModal}
								patientId={currentViewPatient}
							/>
						)}
					</>
				);
			}
		} else {
			return (
				<div className="spinnerWrapper">
					<CircularProgress className={classes.progress} />
				</div>
			);
		}
	};
	const classes = useStyles();
	return (
		<>
			<div className={classes.header}>
				<Typography variant="h4">All patients</Typography>
				<NewPatient />
			</div>
			<Content />
		</>
	);
};

const mapStateToProps = ({ firebase, firestore }) => ({
	userId: firebase.auth.uid,
	requesting: firestore.status.requesting,
	requested: firestore.status.requested,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Patients);
