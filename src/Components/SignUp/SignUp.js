import { Button, CircularProgress, makeStyles, Paper, Typography } from "@material-ui/core";
import { connect } from "react-redux";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { TextField } from "formik-material-ui";

import * as actions from "actions";

import { isMobile } from "react-device-detect";

const useStyles = makeStyles((theme) => ({
	root: {
		width: isMobile ? "100%" : "460px",
		margin: "0 auto",
	},
	formContainer: {
		padding: isMobile ? theme.spacing(2) : null,
		display: "flex",
		flexDirection: "column",
	},
	button: {
		marginTop: theme.spacing(2),
	},
	textField: {
		marginTop: theme.spacing(2),
	},
	paperContainer: {
		padding: theme.spacing(2),
	},
	errorMessage: {
		color: theme.palette.error.main,
	},
	bottomLink: {
		marginTop: theme.spacing(2),
		color: theme.palette.primary.main,
	},
}));

const SignupSchema = Yup.object().shape({
	firstName: Yup.string().required("First Name is required"),
	lastName: Yup.string().required("First Name is required"),
	email: Yup.string().email("Invalid email address!").required("The email is required!"),
	rescueName: Yup.string().required("Your rescue name is required").min(4, "Too short").max(20, "Too long"),
	password: Yup.string()
		.required("The password is required")
		.min(8, "Passwords need to be at least 8 characters long"),
	repeatPassword: Yup.string()
		.required("The repeat password is required")
		.oneOf([Yup.ref("password"), null], "Passwords don't match up"),
});

const SignUp = ({ signUp, loading, error, cleanUp }) => {
	const classes = useStyles();
	useEffect(() => {
		return () => {
			cleanUp();
		};
	}, [cleanUp]);
	return (
		<>
			<div className={classes.root}>
				<Paper className={classes.paperContainer}>
					<Formik
						initialValues={{
							firstName: "",
							lastName: "",
							email: "",
							rescueName: "",
							password: "",
							repeatPassword: "",
						}}
						validationSchema={SignupSchema}
						onSubmit={async (values) => {
							await signUp(values);
						}}
					>
						{({ isSubmitting, isValid }) => {
							if (!loading) {
								return (
									<Form className={classes.formContainer}>
										<Typography variant="h5" gutterBottom>
											SignUp
										</Typography>
										<Field
											component={TextField}
											autoComplete="given-name"
											label="First Name"
											type="text"
											variant="outlined"
											name="firstName"
											className={classes.textField}
										/>
										<Field
											component={TextField}
											autoComplete="family-name"
											label="Last Name"
											type="text"
											variant="outlined"
											name="lastName"
											className={classes.textField}
										/>
										<Field
											component={TextField}
											autoComplete="email"
											label="Email"
											type="email"
											variant="outlined"
											name="email"
											className={classes.textField}
										/>
										<Field
											component={TextField}
											label="Rescue Name"
											autoComplete="nickname"
											type="text"
											variant="outlined"
											name="rescueName"
											className={classes.textField}
										/>
										<Field
											component={TextField}
											autoComplete="new-password"
											label="Password"
											type="password"
											variant="outlined"
											name="password"
											className={classes.textField}
										/>
										<Field
											component={TextField}
											autoComplete="new-password"
											label="Repeat Password"
											type="password"
											variant="outlined"
											name="repeatPassword"
											className={classes.textField}
										/>
										<Button
											variant="contained"
											color="primary"
											className={classes.button}
											type="submit"
											disabled={!isValid}
										>
											SignUp
										</Button>
										<Link to="/login" className={classes.bottomLink}>
											I have an account
										</Link>
									</Form>
								);
							} else {
								return (
									<div className="spinnerWrapper">
										<CircularProgress className={classes.progress} />
									</div>
								);
							}
						}}
					</Formik>
				</Paper>
			</div>
		</>
	);
};

const mapStateToProps = ({ auth }) => ({
	loading: auth.loading,
	error: auth.error,
});

const mapDispatchToProps = {
	signUp: actions.signUp,
	cleanUp: actions.clean,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
