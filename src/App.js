import React from "react";
import { connect } from "react-redux";
import { Route, BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import "./App.css";
import * as actions from "./Store/Actions";

import NavBar from "./Components/NavBar/NavBar";
import Login from "./Components/Login/Login";
import Logout from "./Components/Logout/Logout";
import SignUp from "./Components/SignUp/SignUp";
import Home from "./Components/Home/Home";
import Patients from "./Components/Patients/Patients";
import Profile from "./Components/Profile/Profile";
import ProfileEdit from "./Components/Profile/ProfileEdit";
import { Button, CircularProgress, createMuiTheme, CssBaseline, makeStyles, ThemeProvider } from "@material-ui/core";
import { isMobile } from "react-device-detect";
import RecoverPassword from "./Components/RecoverPassword/RecoverPassword";
import { Alert } from "@material-ui/lab";
import CustomSnackbar from "./Components/CustomSnackbar/CustomSnackbar";

const useStyles = makeStyles((theme) => ({
	verificationAlert: {
		padding: theme.spacing(2),
	},
	routesWrapper: {
		paddingLeft: isMobile ? theme.spacing(2) : null,
		paddingRight: isMobile ? theme.spacing(2) : null,
		paddingTop: theme.spacing(2),
		paddingBottom: theme.spacing(2),
	},
}));

function App({
	loggedIn,
	darkState,
	emailVerified,
	sendVerification,
	verificationLoading,
	verificationError,
	primaryColor,
	secondaryColor,
	profileLoaded,
	profileEmpty,
	cleanUp,
}) {
	let theme;
	if (profileLoaded && profileEmpty === false) {
		theme = createMuiTheme({
			palette: {
				type: darkState ? "dark" : "light",
				primary: {
					main: primaryColor,
				},
				secondary: {
					main: secondaryColor,
				},
			},
		});
	} else {
		theme = createMuiTheme({
			palette: {
				type: darkState ? "dark" : "light",
				primary: {
					main: "#00bcd4",
				},
				secondary: {
					main: "#4caf50",
				},
			},
		});
	}

	const classes = useStyles();

	const handleVerificationEmail = () => {
		sendVerification();
	};

	let routes;
	if (loggedIn) {
		routes = (
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/patients" component={Patients} />
				<Route exact path="/profile" component={Profile} />
				<Route exact path="/profile/edit" component={ProfileEdit} />
				<Route exact path="/logout" component={Logout} />
				<Redirect to="/" />
			</Switch>
		);
	} else {
		routes = (
			<Switch>
				<Route exact path="/login" component={Login} />
				<Route exact path="/signup" component={SignUp} />
				<Route exact path="/recover-password" component={RecoverPassword} />
				<Redirect to="/login" />
			</Switch>
		);
	}

	return (
		<Router>
			<ThemeProvider theme={theme}>
				{profileLoaded ? (
					<>
						<CssBaseline />
						<NavBar />
						<div className="wrapper">
							{loggedIn && !emailVerified && (
								<div className={classes.verificationAlert}>
									<Alert
										variant="filled"
										severity="warning"
										action={
											verificationLoading ? (
												<CircularProgress color="inherit" />
											) : (
												<Button color="inherit" onClick={handleVerificationEmail}>
													{isMobile ? "Resend Email" : "Resend verification email"}
												</Button>
											)
										}
									>
										Your email has not been verified. Please verify your email!
									</Alert>
								</div>
							)}
							<div className={classes.routesWrapper}>{routes}</div>
						</div>
						<CustomSnackbar />
					</>
				) : (
					<div className="spinnerWrapper">
						<CircularProgress />
					</div>
				)}
			</ThemeProvider>
		</Router>
	);
}

const mapStateToProps = ({ firebase, auth }) => ({
	loggedIn: firebase.auth.uid ? true : false,
	darkState: firebase.profile.darkMode,
	emailVerified: firebase.auth.uid ? firebase.auth.emailVerified : null,
	verificationLoading: auth.verifyEmail.loading,
	verificationError: auth.verifyEmail.error,

	profileLoaded: firebase.profile.isLoaded,
	profileEmpty: firebase.profile.isEmpty,

	primaryColor: firebase.profile.primaryColor,
	secondaryColor: firebase.profile.secondaryColor,
});

const mapDispatchToProps = {
	sendVerification: actions.verifyEmail,
	cleanUp: actions.clean,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
