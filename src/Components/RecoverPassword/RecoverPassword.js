import { Button, CircularProgress, makeStyles, Paper, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
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
	paperContainer: {
		padding: theme.spacing(2),
	},
	button: {
		marginTop: theme.spacing(2),
	},
	textField: {
		marginTop: theme.spacing(2),
	},
	errorMessage: {
		color: theme.palette.error.main,
	},
	bottomLink: {
		marginTop: theme.spacing(2),
		color: theme.palette.primary.main,
	},
}));

const RecoverSchema = Yup.object().shape({
	email: Yup.string().email("Invalid email address!").required("The email is required!"),
});

const RecoverPassword = ({ recoverPassword, loading, error, cleanUp }) => {
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
						initialValues={{ email: "" }}
						validationSchema={RecoverSchema}
						onSubmit={async (values, { setSubmitting }) => {
							await recoverPassword(values);
							setSubmitting(false);
						}}
					>
						{({ isSubmitting, isValid }) => {
							if (!isSubmitting) {
								return (
									<Form className={classes.formContainer}>
										<Typography variant="h5" gutterBottom>
											Password recovery
										</Typography>
										<Field
											component={TextField}
											autoComplete="email"
											label="Email"
											type="email"
											variant="outlined"
											name="email"
											className={classes.textField}
										/>
										<Button
											type="submit"
											variant="contained"
											color="primary"
											className={classes.button}
											disabled={!isValid}
										>
											Send reset email
										</Button>
									</Form>
								);
							} else if (isSubmitting || loading) {
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
	loading: auth.forgotten.loading,
	error: auth.forgotten.error,
});

const mapDispatchToProps = {
	recoverPassword: actions.recoverPassword,
	cleanUp: actions.clean,
};

export default connect(mapStateToProps, mapDispatchToProps)(RecoverPassword);
