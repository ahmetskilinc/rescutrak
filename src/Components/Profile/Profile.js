import {
	Avatar,
	Card,
	CardContent,
	CardHeader,
	IconButton,
	makeStyles,
	Typography,
	CircularProgress,
} from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";

import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
	card: {
		maxWidth: 400,
		margin: "0 auto",
	},
	cardContent: {
		padding: theme.spacing(2),
	},
	avatarRow: {
		display: "flex",
		alignItems: "center",
	},
	large: {
		width: theme.spacing(8),
		height: theme.spacing(8),
	},
}));

const Profile = ({ rescueName, userProfile, userAuth, emailVerified, loaded, profilePhoto }) => {
	const { firstName, lastName, email } = userProfile;
	const { createdAt } = userAuth;
	const classes = useStyles();

	if (loaded) {
		return (
			<div className={classes.root}>
				<Card className={classes.card}>
					<CardHeader
						avatar={
							<Avatar alt={`${firstName} ${lastName}`} src={profilePhoto} className={classes.large} />
						}
						action={
							<IconButton aria-label="settings" component={Link} to="/profile/edit">
								<SettingsIcon />
							</IconButton>
						}
						title={`${firstName} ${lastName}`}
						subheader={`${email} (${emailVerified ? "verified" : "not verified"})`}
					/>
					<CardContent className={classes.cardContent}>
						<Typography variant="body2" color="textSecondary">
							Rescue: {rescueName}
						</Typography>
						<Typography variant="body2" color="textSecondary">
							Joined: {new Date(createdAt * 1).toDateString()}
						</Typography>
					</CardContent>
				</Card>
			</div>
		);
	} else {
		return <CircularProgress />;
	}
};

const mapStateToProps = ({ firebase }) => ({
	rescueName: firebase.auth.uid ? firebase.profile.rescueName : null,
	userProfile: firebase.auth.uid ? firebase.profile : null,
	userAuth: firebase.auth.uid ? firebase.auth : null,
	emailVerified: firebase.auth.uid ? firebase.auth.emailVerified : null,
	loaded: firebase.profile.isLoaded,
	profilePhoto: firebase.profile.fileUrl,
});
export default connect(mapStateToProps, null)(Profile);
