import {
	Card,
	CardActions,
	CardContent,
	CardHeader,
	CircularProgress,
	Divider,
	IconButton,
	makeStyles,
	Modal,
	Typography,
} from "@material-ui/core";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import SaveRoundedIcon from "@material-ui/icons/SaveRounded";
import DeleteForeverRoundedIcon from "@material-ui/icons/DeleteForeverRounded";
import React, { useState } from "react";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-material-ui";
import { DatePicker } from "formik-material-ui-pickers";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import * as Yup from "yup";
import * as actions from "../../Store/Actions";
import { connect } from "react-redux";

import { useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";

const useStyles = makeStyles((theme) => ({
	root: { width: 345 },
	cardContent: {
		padding: theme.spacing(2),
	},
	textField: {
		marginTop: theme.spacing(2),
		width: "100%",
	},
	modal: {
		display: "flex",
		padding: theme.spacing(4),
		alignItems: "center",
		justifyContent: "center",
	},
	heading: {
		fontSize: theme.typography.pxToRem(15),
		flexShrink: 0,
	},
	selectInput: {
		marginTop: theme.spacing(2),
		minWidth: 200,
	},
}));

const PatientSchema = Yup.object().shape({
	name: Yup.string().required("You must enter a name for the animal"),
	species: Yup.string().required("You must enter the species of the animal"),
});

const ViewPatient = ({ showModal, close, updatePatient, userId, patientId, deletePatient }) => {
	const [editPatient, setEditPatient] = useState(false);
	const classes = useStyles();

	useFirestoreConnect([
		{
			collection: "patients",
			doc: userId,
			subcollections: [{ collection: "patients" }],
			storeAs: "patients",
		},
	]);

	const patient = useSelector(({ firestore: { data } }) => data.patients && data.patients[patientId]);

	return (
		<Modal disablePortal disableEnforceFocus disableAutoFocus open={showModal} className={classes.modal}>
			<Card className={classes.root}>
				<CardHeader
					action={
						<IconButton aria-label="close" onClick={close} disabled={editPatient}>
							<CancelRoundedIcon />
						</IconButton>
					}
					title={patient.name}
					subheader={patient.species}
				/>

				{editPatient ? (
					<>
						<MuiPickersUtilsProvider utils={DateFnsUtils}>
							<Formik
								initialValues={{
									name: patient.name,
									status: patient.status,
									species: patient.species,
									dateAdded: new Date(patient.dateAdded.toDate()),
									dateOut: new Date(patient.dateOut.toDate()),
									colour: patient.colour,
									rescuer: patient.rescuer,
								}}
								validationSchema={PatientSchema}
								onSubmit={async (values, { setSubmitting, resetForm }) => {
									setSubmitting(false);
									console.log(values, patientId);
									updatePatient(values, patientId);
									setEditPatient(false);
								}}
							>
								{({ isSubmitting, isValid }) => {
									if (!isSubmitting) {
										return (
											<Form>
												<CardContent>
													<Field
														component={TextField}
														label="Name"
														type="text"
														variant="outlined"
														name="name"
														className={classes.textField}
													/>
													<Field
														component={TextField}
														label="Status"
														type="text"
														variant="outlined"
														name="status"
														className={classes.textField}
													/>
													<Field
														component={TextField}
														label="Species"
														type="text"
														variant="outlined"
														name="species"
														className={classes.textField}
													/>

													<Field
														component={DatePicker}
														label="Date Added"
														variant="outlined"
														name="dateAdded"
														className={classes.textField}
													/>

													<Field
														component={DatePicker}
														label="Date Discharged"
														variant="outlined"
														name="dateOut"
														className={classes.textField}
													/>

													<Field
														component={TextField}
														label="Colour"
														type="text"
														variant="outlined"
														name="colour"
														className={classes.textField}
													/>
													<Field
														component={TextField}
														label="Rescuer"
														type="text"
														variant="outlined"
														name="rescuer"
														className={classes.textField}
													/>
												</CardContent>
												<Divider />
												<CardActions disableSpacing>
													<IconButton type="submit" color="primary">
														<SaveRoundedIcon />
													</IconButton>
												</CardActions>
											</Form>
										);
									} else if (isSubmitting) {
										return <CircularProgress className={classes.progress} />;
									}
								}}
							</Formik>
						</MuiPickersUtilsProvider>
					</>
				) : (
					<>
						<CardContent>
							<Typography variant="body2" color="textSecondary" component="p">
								Colour: {patient.colour}
							</Typography>
							<Typography variant="body2" color="textSecondary" component="p">
								Status: {patient.status}
							</Typography>
							<Typography variant="body2" color="textSecondary" component="p">
								Date Added: {new Date(patient.dateAdded.toDate()).toDateString()}
							</Typography>
							<Typography variant="body2" color="textSecondary" component="p">
								Date Discharged: {new Date(patient.dateOut.toDate()).toDateString()}
							</Typography>
							<Typography variant="body2" color="textSecondary" component="p">
								Rescuer: {patient.rescuer}
							</Typography>
						</CardContent>
						<Divider />
						<CardActions disableSpacing>
							<IconButton aria-label="share" onClick={() => setEditPatient(true)}>
								<EditRoundedIcon />
							</IconButton>
							<IconButton
								aria-label="share"
								onClick={() => {
									deletePatient(patientId);
									close();
								}}
							>
								<DeleteForeverRoundedIcon />
							</IconButton>
						</CardActions>
					</>
				)}
			</Card>
		</Modal>
	);
};

const mapStateToProps = ({ patient, firestore, firebase }) => ({
	loading: patient.loading,
	error: patient.error,
	userId: firebase.auth.uid,
	firestoreData: firestore.ordered,
	requesting: firestore.status.requesting,
	requested: firestore.status.requested,
});

const mapDispatchToProps = {
	updatePatient: actions.editPatient,
	deletePatient: actions.deletePatient,
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewPatient);
