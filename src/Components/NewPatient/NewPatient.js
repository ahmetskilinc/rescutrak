import {
	Button,
	Card,
	CardActions,
	CardContent,
	CircularProgress,
	Divider,
	makeStyles,
	Modal,
	Typography,
	MenuItem,
	InputLabel,
	FormControl,
	CardHeader,
	IconButton,
} from "@material-ui/core";
import React, { useState } from "react";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import { connect } from "react-redux";
import { Formik, Form, Field } from "formik";
import { TextField, Select } from "formik-material-ui";
import * as Yup from "yup";

import * as actions from "actions";

const useStyles = makeStyles((theme) => ({
	card: {
		maxWidth: 440,
		margin: "0 auto",
	},
	cardContent: {
		padding: theme.spacing(2),
	},
	divider: {
		marginTop: theme.spacing(3),
		marginBottom: theme.spacing(3),
	},
	buttons: {
		display: "flex",
		justifyContent: "space-between",
	},
	button: {
		marginTop: theme.spacing(2),
	},
	textField: {
		marginTop: theme.spacing(2),
		width: "100%",
	},
	errorMessage: {
		color: theme.palette.error.main,
	},
	modal: {
		display: "flex",
		padding: theme.spacing(4),
		alignItems: "center",
		justifyContent: "center",
	},
}));

const PatientSchema = Yup.object().shape({
	name: Yup.string().required("You must enter a name for the animal"),
	species: Yup.string().required("You must enter the species of the animal"),
});

const NewPatient = ({ addPatient, loading, error }) => {
	const [showModal, setShowModal] = useState(false);
	const classes = useStyles();
	return (
		<>
			<Button variant="contained" color="secondary" onClick={() => setShowModal(true)}>
				Add Patient
			</Button>
			<Modal open={showModal} className={classes.modal}>
				<Card className={classes.card}>
					<CardHeader
						action={
							<IconButton aria-label="close" onClick={() => setShowModal(false)}>
								<CancelRoundedIcon />
							</IconButton>
						}
						title="New Patient"
					/>
					<>
						<Formik
							initialValues={{
								name: "",
								status: "",
								species: "",
								colour: "",
								rescuer: "",
							}}
							validationSchema={PatientSchema}
							onSubmit={async (values, { setSubmitting, resetForm }) => {
								const res = addPatient(values);
								setSubmitting(false);
								if (res) {
									setShowModal(false);
								}
								resetForm();
								// console.log(values);
							}}
						>
							{({ isSubmitting, isValid }) => {
								if (!isSubmitting) {
									return (
										<Form>
											<CardContent className={classes.cardContent}>
												<Field
													component={TextField}
													label="Name"
													type="text"
													variant="outlined"
													name="name"
													className={classes.textField}
												/>
												<FormControl variant="outlined" className={classes.textField}>
													<InputLabel>Status</InputLabel>
													<Field component={Select} name="status" label="Status">
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
													label="Species"
													type="text"
													variant="outlined"
													name="species"
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
												<Typography variant="body1" className={classes.errorMessage}>
													{error}
												</Typography>
											</CardContent>
											<Divider />
											<CardActions className={classes.cardContent}>
												<Button
													variant="contained"
													color="primary"
													type="submit"
													disabled={!isValid}
												>
													Add Patient
												</Button>
												<Button
													variant="contained"
													color="secondary"
													onClick={() => setShowModal(false)}
												>
													Cancel
												</Button>
											</CardActions>
										</Form>
									);
								} else if (isSubmitting) {
									return <CircularProgress className={classes.progress} />;
								}
							}}
						</Formik>
					</>
				</Card>
			</Modal>
		</>
	);
};

const mapStateToProps = ({ patient }) => ({
	loading: patient.loading,
	error: patient.error,
});

const mapDispatchToProps = {
	addPatient: actions.addPatient,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewPatient);
