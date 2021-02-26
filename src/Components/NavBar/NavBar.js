import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { Avatar, Button, IconButton, Menu, MenuItem, Switch } from "@material-ui/core";

import { connect } from "react-redux";

import * as actions from "actions";

const NavBar = ({ loggedIn, toggleDarkMode, darkState, profileLoaded, usersName, profilePhoto }) => {
	const [anchorEl, setAnchorEl] = useState(null);

	const useStyles = makeStyles((theme) => ({
		colorWhite: {
			color: "#ffffff",
		},
		pushRight: {
			paddingLeft: theme.spacing(2),
			flexGrow: 1,
		},
		menuItem: {
			width: 160,
		},
	}));

	const classes = useStyles();

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleThemeChange = () => {
		toggleDarkMode(!darkState);
	};

	return (
		<AppBar>
			<Toolbar>
				<Typography
					variant="h6"
					component={Link}
					to="/"
					className={(!loggedIn ? classes.pushRight : "", classes.colorWhite)}
				>
					RescuTrak.
				</Typography>
				{loggedIn && (
					<>
						<div className={classes.pushRight}>
							<Button className={classes.colorWhite} component={Link} to="/patients">
								Patients
							</Button>
						</div>
						{profileLoaded && darkState !== null && (
							<Switch checked={darkState} onChange={handleThemeChange} />
						)}
						<IconButton
							aria-controls="nav-menu"
							aria-haspopup="true"
							edge="end"
							onClick={handleClick}
							className={classes.colorWhite}
						>
							<Avatar alt={usersName} src={profilePhoto} />
						</IconButton>
						<Menu
							id="nav-menu"
							anchorEl={anchorEl}
							keepMounted
							open={Boolean(anchorEl)}
							onClose={handleClose}
						>
							<MenuItem onClick={handleClose} component={Link} to="/profile" className={classes.menuItem}>
								Profile
							</MenuItem>
							<MenuItem
								onClick={handleClose}
								component={Link}
								to="/profile/edit"
								className={classes.menuItem}
							>
								Settings
							</MenuItem>
							<MenuItem onClick={handleClose} component={Link} to="/logout" className={classes.menuItem}>
								Logout
							</MenuItem>
						</Menu>
					</>
				)}
			</Toolbar>
		</AppBar>
	);
};

const mapStateToProps = ({ firebase, auth }) => ({
	loggedIn: firebase.auth.uid ? true : false,
	darkState: firebase.profile.darkMode,
	profileLoaded: firebase.profile.isLoaded,
	usersName: `${firebase.profile.firstName} ${firebase.profile.lastName}`,
	profilePhoto: firebase.profile.fileUrl,
});

const mapDispatchToProps = {
	toggleDarkMode: actions.toggleDarkMode,
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
