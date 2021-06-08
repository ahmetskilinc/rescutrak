import React from "react";
import { connect } from "react-redux";
import { Route, BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { Helmet } from "react-helmet";
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

const useStyles = makeStyles((theme) => ({
	verificationAlert: {
		padding: theme.spacing(2),
	},
	routesWrapper: {
		paddingLeft: 0,
		paddingRight: 0,
		paddingTop: theme.spacing(1),
		paddingBottom: theme.spacing(1),
	},
}));

function App({
	loggedIn,
	darkState,
	emailVerified,
	primaryColor,
	secondaryColor,
	profileLoaded,
	profileEmpty,
	rescueName,
}) {
	let theme;
	if (profileLoaded && profileEmpty === false) {
		theme = createMuiTheme({
			palette: {
				type: darkState ? "dark" : "light",
				primary: {
					main: darkState ? "#121212" : primaryColor,
				},
				secondary: {
					main: darkState ? primaryColor : secondaryColor,
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
			<React.Fragment>
				<Helmet>
					<title>{rescueName} | ReacuTrak</title>
					<meta name="theme-color" content={`${primaryColor}`} />
					<meta name="msapplication-TileColor" content={`${primaryColor}`} />
					<meta name="msapplication-navbutton-color" content={`${primaryColor}`} />
					<meta name="apple-mobile-web-app-status-bar-style" content={`${primaryColor}`} />
				</Helmet>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/patients" component={Patients} />
					<Route exact path="/patients/:when" component={Patients} />
					<Route exact path="/profile" component={Profile} />
					<Route exact path="/profile/edit" component={ProfileEdit} />
					<Route exact path="/logout" component={Logout} />
					<Redirect to="/" />
				</Switch>
			</React.Fragment>
		);
	} else {
		routes = (
			<React.Fragment>
				<Helmet>
					<meta name="theme-color" content={`${primaryColor}`} />
				</Helmet>
				<Switch>
					<Route exact path="/login" component={Login} />
					<Route exact path="/signup" component={SignUp} />
					<Route exact path="/recover-password" component={RecoverPassword} />
					<Redirect to="/login" />
				</Switch>
			</React.Fragment>
		);
	}

	return (
		<Router>
			<ThemeProvider theme={theme}>
				{profileLoaded ? (
					<React.Fragment>
						<CssBaseline />
						<NavBar />
						<div className="wrapper">
							{loggedIn && !emailVerified && <EmailVerificationAlert />}
							<div className={classes.routesWrapper}>{routes}</div>
						</div>
						<CustomSnackbar />
					</React.Fragment>
				) : (
					<div className="spinnerWrapper">
						<CircularProgress />
					</div>
				)}
			</ThemeProvider>
		</Router>
	);
}

const mapStateToProps = ({ firebase }) => ({
	loggedIn: firebase.auth.uid ? true : false,
	darkState: firebase.profile.darkMode,
	emailVerified: firebase.auth.uid ? firebase.auth.emailVerified : null,
	profileLoaded: firebase.profile.isLoaded,
	profileEmpty: firebase.profile.isEmpty,
	primaryColor: firebase.profile.primaryColor,
	secondaryColor: firebase.profile.secondaryColor,
	rescueName: firebase.profile.rescueName,
});

const mapDispatchToProps = {
	cleanUp: actions.clean,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
