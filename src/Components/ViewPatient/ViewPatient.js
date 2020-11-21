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
	MenuItem,
	InputLabel,
	FormControl,
} from "@material-ui/core";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import SaveRoundedIcon from "@material-ui/icons/SaveRounded";
import DeleteForeverRoundedIcon from "@material-ui/icons/DeleteForeverRounded";
import React, { useState } from "react";
import { Field, Form, Formik } from "formik";
import { TextField, Select } from "formik-material-ui";
import { DatePicker } from "formik-material-ui-pickers";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import * as Yup from "yup";
import * as actions from "actions";
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
	const [editPatientDisabled, setEditPatientDisabled] = useState(true);
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
						<IconButton aria-label="close" onClick={close} disabled={!editPatientDisabled}>
							<CancelRoundedIcon />
						</IconButton>
					}
					title={patient.name}
				/>

				{
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
									setEditPatientDisabled(true);
								}}
							>
								{({ isSubmitting, isValid }) => {
									if (!isSubmitting) {
										return (
											<Form>
												<CardContent>
													<Field
														component={TextField}
														disabled={editPatientDisabled}
														label="Name"
														type="text"
														variant="outlined"
														name="name"
														className={classes.textField}
													/>
													<FormControl variant="outlined" className={classes.textField}>
														<InputLabel>Status</InputLabel>
														<Field
															component={Select}
															disabled={editPatientDisabled}
															name="status"
															label="Status"
														>
															<MenuItem value="none">
																<em>None</em>
															</MenuItem>
															<MenuItem value="recovery">Recovery</MenuItem>
															<MenuItem value="medication">Medication</MenuItem>
															<MenuItem value="icu">Intensive Care</MenuItem>
															<MenuItem value="released">Released</MenuItem>
															<MenuItem value="deceased">Deceased</MenuItem>
															<MenuItem value="unreleasable">Unreleasable</MenuItem>
														</Field>
													</FormControl>
													<Field
														component={TextField}
														disabled={editPatientDisabled}
														label="Species"
														type="text"
														variant="outlined"
														name="species"
														className={classes.textField}
													/>

													<Field
														component={DatePicker}
														disabled={editPatientDisabled}
														label="Date Added"
														variant="outlined"
														name="dateAdded"
														className={classes.textField}
													/>

													<Field
														component={DatePicker}
														disabled={editPatientDisabled}
														label="Date Discharged"
														variant="outlined"
														name="dateOut"
														className={classes.textField}
													/>

													<Field
														component={TextField}
														disabled={editPatientDisabled}
														label="Colour"
														type="text"
														variant="outlined"
														name="colour"
														className={classes.textField}
													/>
													<Field
														component={TextField}
														disabled={editPatientDisabled}
														label="Rescuer"
														type="text"
														variant="outlined"
														name="rescuer"
														className={classes.textField}
													/>
												</CardContent>
												<Divider />
												<CardActions>
													{editPatientDisabled ? (
														<IconButton
															color="primary"
															onClick={(e) => {
																e.preventDefault();
																setEditPatientDisabled(false);
															}}
														>
															<EditRoundedIcon />
														</IconButton>
													) : (
														<>
															<IconButton type="submit" color="primary">
																<SaveRoundedIcon />
															</IconButton>
															<IconButton
																onClick={() => {
																	deletePatient(patientId);
																	close();
																}}
															>
																<DeleteForeverRoundedIcon />
															</IconButton>
														</>
													)}
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
				}
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
