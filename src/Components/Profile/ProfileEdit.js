import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Button,
	Card,
	CardActions,
	CardContent,
	CircularProgress,
	Divider,
	FormControlLabel,
	makeStyles,
	Modal,
	Radio,
	Typography,
	withStyles,
} from "@material-ui/core";
import { blue, cyan, deepOrange, green, indigo, orange, pink, red } from "@material-ui/core/colors";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import { RadioGroup, TextField } from "formik-material-ui";

import * as actions from "actions";

import { isMobile } from "react-device-detect";
import { DropzoneDialog } from "material-ui-dropzone";

const DangerButton = withStyles((theme) => ({
	root: {
		color: theme.palette.getContrastText(red[500]),
		backgroundColor: red[500],
		"&:hover": {
			backgroundColor: red[700],
		},
	},
}))(Button);

const useStyles = makeStyles((theme) => ({
	root: {
		width: isMobile ? "100%" : "520px",
		margin: "0 auto",
	},

	card: {
		maxWidth: "400px",
		margin: "0 auto",
	},
	cardContent: {
		padding: theme.spacing(1),
	},
	divider: {
		margin: "auto",
		marginTop: theme.spacing(3),
		marginBottom: theme.spacing(3),
		width: isMobile ? "100%" : "520px",
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
	heading: {
		fontSize: theme.typography.pxToRem(15),
		flexShrink: 0,
	},

	themeForm: {
		display: "flex",
	},

	blue: {
		color: blue[500],
		"&:hover": {
			color: blue[700],
		},
	},
	red: {
		color: red[500],
		"&:hover": {
			color: red[700],
		},
	},
	orange: {
		color: orange[500],
		"&:hover": {
			color: orange[700],
		},
	},
	deepOrange: {
		color: deepOrange[500],
		"&:hover": {
			color: deepOrange[700],
		},
	},
	indigo: {
		color: indigo[500],
		"&:hover": {
			color: indigo[700],
		},
	},
	cyan: {
		color: cyan[500],
		"&:hover": {
			color: cyan[700],
		},
	},
	green: {
		color: green[500],
		"&:hover": {
			color: green[700],
		},
	},
	pink: {
		color: pink[500],
		"&:hover": {
			color: pink[700],
		},
	},
}));

const UpdateSchema = Yup.object().shape({
	firstName: Yup.string().required("First Name is required"),
	lastName: Yup.string().required("First Name is required"),
	email: Yup.string().email("Invalid email address!").required("The email is required!"),
	rescueName: Yup.string().required("Your rescue name is required").min(4, "Too short").max(20, "Too long"),
});

const ThemeSchema = Yup.object().shape({
	primaryColor: Yup.string().required(),
	secondaryColor: Yup.string().required(),
});

const ProfileEdit = ({
	firebase,
	editProfile,
	editProfileLoading,
	cleanUp,
	deleteAccount,
	sendPasswordResetEmail,
	uploadPhoto,
	updateTheme,
}) => {
	const [expanded, setExpanded] = useState(false);
	const [uploadOpen, setUploadOpen] = useState(false);

	const handleChange = (panel) => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	};
	const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);

	const classes = useStyles();

	useEffect(() => {
		return () => {
			cleanUp();
		};
	}, [cleanUp]);

	const handleDeleteAccount = () => {
		deleteAccount();
		setShowDeleteAccountModal(false);
	};

	const handleSendPasswordResetEmail = () => {
		sendPasswordResetEmail();
	};

	const handleUploadPhoto = (files) => {
		uploadPhoto(files);
		setUploadOpen(false);
	};

	if (!firebase.profile.isLoaded) return <CircularProgress />;
	return (
		<React.Fragment>
			<div className={classes.root}>
				<Accordion expanded={expanded === "panel1"} onChange={handleChange("panel1")}>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls="panel1bh-content"
						id="panel1bh-header"
					>
						<Typography className={classes.heading}>Edit Profile</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Formik
							initialValues={{
								firstName: firebase.profile.firstName,
								lastName: firebase.profile.lastName,
								email: firebase.auth.email,
								rescueName: firebase.profile.rescueName,
							}}
							validateOnMount={true}
							validationSchema={UpdateSchema}
							onSubmit={async (values, { setSubmitting }) => {
								editProfile(values);
								setSubmitting(false);
							}}
						>
							{({ isSubmitting, isValid }) => {
								if (!isSubmitting) {
									return (
										<Form>
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
												autoComplete="username"
												type="text"
												variant="outlined"
												name="rescueName"
												className={classes.textField}
											/>
											<Divider className={classes.divider} />
											<Button
												variant="contained"
												color="secondary"
												type="submit"
												disabled={!isValid}
											>
												{editProfileLoading ? (
													<div className="spinnerWrapper">
														<CircularProgress className={classes.progress} />
													</div>
												) : (
													"Save Profile"
												)}
											</Button>
											<Typography
												variant="body1"
												className={classes.errorMessage}
											></Typography>
										</Form>
									);
								}
							}}
						</Formik>
					</AccordionDetails>
				</Accordion>
				<Accordion expanded={expanded === "panel2"} onChange={handleChange("panel2")}>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls="panel2bh-content"
						id="panel2bh-header"
					>
						<Typography className={classes.heading}>Set/Change Profile Photo</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Button variant="contained" color="secondary" onClick={() => setUploadOpen(true)}>
							Upload Photo
						</Button>
						<DropzoneDialog
							open={uploadOpen}
							onSave={(files) => handleUploadPhoto(files)}
							acceptedFiles={["image/jpeg", "image/png", "image/bmp"]}
							showPreviews={true}
							maxFileSize={5000000}
							onClose={() => setUploadOpen(false)}
						/>
					</AccordionDetails>
				</Accordion>
				<Accordion expanded={expanded === "panel3"} onChange={handleChange("panel3")}>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls="panel2bh-content"
						id="panel2bh-header"
					>
						<Typography className={classes.heading}>Change My Theme</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Formik
							initialValues={{
								primaryColor: firebase.profile.primaryColor,
								secondaryColor: firebase.profile.secondaryColor,
							}}
							validateOnMount={true}
							validationSchema={ThemeSchema}
							onSubmit={async (values, { setSubmitting }) => {
								updateTheme(values);
								setSubmitting(false);
							}}
						>
							{({ isSubmitting, isValid }) => {
								if (!isSubmitting) {
									return (
										<Form>
											<div className={classes.themeForm}>
												<Field
													component={RadioGroup}
													name="primaryColor"
													className={classes.selectInput}
												>
													<FormControlLabel
														className={classes.cyan}
														value="#00bcd4"
														control={<Radio disabled={isSubmitting} />}
														label="Cyan"
														disabled={isSubmitting}
													/>
													<FormControlLabel
														className={classes.green}
														value="#4caf50"
														control={<Radio disabled={isSubmitting} />}
														label="Green"
														disabled={isSubmitting}
													/>
													<FormControlLabel
														className={classes.blue}
														value="#2196f3"
														control={<Radio disabled={isSubmitting} />}
														label="Blue"
														disabled={isSubmitting}
													/>
													<FormControlLabel
														value="#f44336"
														className={classes.red}
														control={<Radio disabled={isSubmitting} />}
														label="Red"
														disabled={isSubmitting}
													/>
													<FormControlLabel
														value="#3f51b5"
														className={classes.indigo}
														control={<Radio disabled={isSubmitting} />}
														label="Indigo"
														disabled={isSubmitting}
													/>
													<FormControlLabel
														value="#ff9800"
														className={classes.orange}
														control={<Radio disabled={isSubmitting} />}
														label="Orange"
														disabled={isSubmitting}
													/>
													<FormControlLabel
														value="#ff5722"
														className={classes.deepOrange}
														control={<Radio disabled={isSubmitting} />}
														label="Deep Orange"
														disabled={isSubmitting}
													/>
													<FormControlLabel
														value="#e91e63"
														className={classes.pink}
														control={<Radio disabled={isSubmitting} />}
														label="Pink"
														disabled={isSubmitting}
													/>
												</Field>
												<Field
													component={RadioGroup}
													name="secondaryColor"
													className={classes.selectInput}
												>
													<FormControlLabel
														className={classes.cyan}
														value="#00bcd4"
														control={<Radio disabled={isSubmitting} />}
														label="Cyan"
														disabled={isSubmitting}
													/>
													<FormControlLabel
														className={classes.green}
														value="#4caf50"
														control={<Radio disabled={isSubmitting} />}
														label="Green"
														disabled={isSubmitting}
													/>
													<FormControlLabel
														className={classes.blue}
														value="#2196f3"
														control={<Radio disabled={isSubmitting} />}
														label="Blue"
														disabled={isSubmitting}
													/>
													<FormControlLabel
														value="#f44336"
														className={classes.red}
														control={<Radio disabled={isSubmitting} />}
														label="Red"
														disabled={isSubmitting}
													/>
													<FormControlLabel
														value="#3f51b5"
														className={classes.indigo}
														control={<Radio disabled={isSubmitting} />}
														label="Indigo"
														disabled={isSubmitting}
													/>
													<FormControlLabel
														value="#ff9800"
														className={classes.orange}
														control={<Radio disabled={isSubmitting} />}
														label="Orange"
														disabled={isSubmitting}
													/>
													<FormControlLabel
														value="#ff5722"
														className={classes.deepOrange}
														control={<Radio disabled={isSubmitting} />}
														label="Deep Orange"
														disabled={isSubmitting}
													/>
													<FormControlLabel
														value="#e91e63"
														className={classes.pink}
														control={<Radio disabled={isSubmitting} />}
														label="Pink"
														disabled={isSubmitting}
													/>
												</Field>
											</div>
											<Divider className={classes.divider} />
											<Button
												variant="contained"
												color="secondary"
												type="submit"
												disabled={!isValid}
											>
												Save Profile
											</Button>
											<Typography
												variant="body1"
												className={classes.errorMessage}
											></Typography>
										</Form>
									);
								} else if (isSubmitting) {
									return (
										<div className="spinnerWrapper">
											<CircularProgress className={classes.progress} />
										</div>
									);
								}
							}}
						</Formik>
					</AccordionDetails>
				</Accordion>
			</div>
			<Divider className={classes.divider} />
			<div className={classes.root}>
				<Accordion expanded={expanded === "panel4"} onChange={handleChange("panel4")}>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls="panel2bh-content"
						id="panel2bh-header"
					>
						<Typography className={classes.heading}>Send Password Reset Email</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Button variant="contained" color="secondary" onClick={handleSendPasswordResetEmail}>
							Reset password
						</Button>
					</AccordionDetails>
				</Accordion>
			</div>
			<Divider className={classes.divider} />
			<div className={classes.root}>
				<Accordion expanded={expanded === "panel5"} onChange={handleChange("panel5")}>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls="panel3bh-content"
						id="panel3bh-header"
					>
						<Typography className={classes.heading}>I Want To Delete My Account</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<DangerButton
							variant="contained"
							color="primary"
							onClick={() => setShowDeleteAccountModal(true)}
						>
							Delete My Account
						</DangerButton>
					</AccordionDetails>
				</Accordion>
			</div>

			<Modal
				disablePortal
				disableEnforceFocus
				disableAutoFocus
				open={showDeleteAccountModal}
				className={classes.modal}
			>
				<Card className={classes.card}>
					<CardContent className={classes.cardContent}>
						<Typography gutterBottom variant="h5">
							Are you sure?
						</Typography>
						<Typography gutterBottom>We don't want to see you go!</Typography>
					</CardContent>
					<Divider />
					<CardActions className={classes.cardContent}>
						<DangerButton color="secondary" variant="contained" onClick={handleDeleteAccount}>
							Delete my account
						</DangerButton>
						<Button
							color="primary"
							variant="contained"
							onClick={() => setShowDeleteAccountModal(false)}
						>
							Cancel
						</Button>
					</CardActions>
				</Card>
			</Modal>
		</React.Fragment>
	);
};

const mapStateToProps = ({ firebase, auth }) => ({
	firebase,
	editProfileLoading: auth.profileEdit.loading,
});

const mapDispatchToProps = {
	editProfile: actions.editProfile,
	deleteAccount: actions.deleteAccount,
	sendPasswordResetEmail: actions.sendPasswordResetEmail,
	updateTheme: actions.updateTheme,
	uploadPhoto: actions.uploadPhoto,
	cleanUp: actions.clean,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEdit);
