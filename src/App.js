import React from "react";
import { connect } from "react-redux";
import { Route, BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import "./App.css";
import * as actions from "actions";

import {
	Home,
	Profile,
	NavBar,
	Login,
	Logout,
	SignUp,
	Patients,
	ProfileEdit,
	CustomSnackbar,
	RecoverPassword,
	EmailVerificationAlert,
} from "components";
import { CircularProgress, createMuiTheme, CssBaseline, makeStyles, ThemeProvider } from "@material-ui/core";
import { isMobile } from "react-device-detect";

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

function App({ loggedIn, darkState, emailVerified, primaryColor, secondaryColor, profileLoaded, profileEmpty }) {
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

	let routes;
	if (loggedIn) {
		routes = (
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/patients" component={Patients} />
				<Route exact path="/patients/:when" component={Patients} />
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
							{loggedIn && !emailVerified && <EmailVerificationAlert />}
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
	profileLoaded: firebase.profile.isLoaded,
	profileEmpty: firebase.profile.isEmpty,
	primaryColor: firebase.profile.primaryColor,
	secondaryColor: firebase.profile.secondaryColor,
});

const mapDispatchToProps = {
	cleanUp: actions.clean,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
