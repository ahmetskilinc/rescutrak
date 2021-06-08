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
} from "@material-ui/core";
import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";
import * as Yup from "yup";

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

const PatientSchema = Yup.object().shape({});

const FilterModal = ({ setFilterRescuer, error }) => {
	const [showModal, setShowModal] = useState(false);
	const classes = useStyles();
	return (
		<React.Fragment>
			<Button color="secondary" onClick={() => setShowModal(true)}>
				Filter
			</Button>
			<Modal open={showModal} className={classes.modal}>
				<React.Fragment>
					<Formik
						initialValues={{
							rescuer: "",
						}}
						validateOnMount={true}
						validationSchema={PatientSchema}
						onSubmit={async (values, { setSubmitting, resetForm }) => {
							setShowModal(false);
							setFilterRescuer(values.rescuer);
							resetForm();
						}}
					>
						{({ isSubmitting, isValid }) => {
							if (!isSubmitting) {
								return (
									<Form>
										<Card className={classes.card}>
											<CardContent className={classes.cardContent}>
												<Typography variant="h5" gutterBottom>
													Filter Patients
												</Typography>
												{/* TODO: Finish forms for filtering */}
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
													Filter
												</Button>
												<Button
													variant="contained"
													color="secondary"
													onClick={() => setShowModal(false)}
												>
													Cancel
												</Button>
											</CardActions>
										</Card>
									</Form>
								);
							} else if (isSubmitting) {
								return <CircularProgress className={classes.progress} />;
							}
						}}
					</Formik>
				</React.Fragment>
			</Modal>
		</React.Fragment>
	);
};

export default FilterModal;
