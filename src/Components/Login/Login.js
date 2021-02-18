import { Button, CircularProgress, makeStyles, Paper, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { TextField } from "formik-material-ui";

import * as actions from "actions";

import { isMobile } from "react-device-detect";

const useStyles = makeStyles((theme) => ({
	root: {
		paddingTop: theme.spacing(2),
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

const LoginSchema = Yup.object().shape({
	email: Yup.string().email("Invalid email address!").required("The email is required!"),
	password: Yup.string().required("The password is required"),
});

const Login = ({ login, loading, cleanUp }) => {
	const classes = useStyles();

	useEffect(() => {
		return () => {
			cleanUp();
		};
	}, [cleanUp]);

	return (
		<>
			<div className={classes.root}>
				<Formik
					initialValues={{ email: "", password: "" }}
					isInitialValid={false}
					validationSchema={LoginSchema}
					onSubmit={async (values) => {
						await login(values);
					}}
				>
					{({ isValid }) => {
						if (!loading) {
							return (
								<Paper className={classes.paperContainer}>
									<Form className={classes.formContainer}>
										<Typography variant="h5" gutterBottom>
											Login
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
										<Field
											component={TextField}
											autoComplete="current-password"
											label="Password"
											type="password"
											variant="outlined"
											name="password"
											className={classes.textField}
										/>
										<Button
											type="submit"
											variant="contained"
											color="secondary"
											className={classes.button}
											disabled={!isValid}
										>
											Login
										</Button>
										<Link to="/signup" className={classes.bottomLink}>
											I don't have an account
										</Link>
										<Link to="/recover-password" className={classes.bottomLink}>
											I've forgotten my password
										</Link>
									</Form>
								</Paper>
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
			</div>
		</>
	);
};

const mapStateToProps = ({ auth }) => ({
	loading: auth.loading,
});

const mapDispatchToProps = {
	login: actions.signIn,
	cleanUp: actions.clean,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
