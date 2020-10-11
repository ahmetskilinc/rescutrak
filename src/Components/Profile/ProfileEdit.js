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
	FormControl,
	InputLabel,
	makeStyles,
	MenuItem,
	Modal,
	Typography,
	withStyles,
} from "@material-ui/core";
import { blue, cyan, deepOrange, green, indigo, orange, pink } from "@material-ui/core/colors";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import { Select, TextField } from "formik-material-ui";

import * as actions from "../../Store/Actions";

import { isMobile } from "react-device-detect";
import { red } from "@material-ui/core/colors";
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
		width: isMobile ? "100%" : "400px",
		margin: "0 auto",
	},

	card: {
		maxWidth: 400,
		margin: "0 auto",
	},
	cardContent: {
		padding: theme.spacing(2),
	},
	divider: {
		margin: "auto",
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
	heading: {
		fontSize: theme.typography.pxToRem(15),
		flexShrink: 0,
	},
	selectInput: {
		marginTop: theme.spacing(2),
		minWidth: 200,
	},

	blue: {
		backgroundColor: blue[500],
		"&:hover": {
			backgroundColor: blue[700],
		},
	},
	red: {
		backgroundColor: red[500],
		"&:hover": {
			backgroundColor: red[700],
		},
	},
	orange: {
		backgroundColor: orange[500],
		"&:hover": {
			backgroundColor: orange[700],
		},
	},
	deepOrange: {
		backgroundColor: deepOrange[500],
		"&:hover": {
			backgroundColor: deepOrange[700],
		},
	},
	indigo: {
		backgroundColor: indigo[500],
		"&:hover": {
			backgroundColor: indigo[700],
		},
	},
	cyan: {
		backgroundColor: cyan[500],
		"&:hover": {
			backgroundColor: cyan[700],
		},
	},
	green: {
		backgroundColor: green[500],
		"&:hover": {
			backgroundColor: green[700],
		},
	},
	pink: {
		backgroundColor: pink[500],
		"&:hover": {
			backgroundColor: pink[700],
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
		<>
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
											<Typography variant="body1" className={classes.errorMessage}></Typography>
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
											<FormControl className={classes.selectInput}>
												<InputLabel id="select-primary">Primary Colour</InputLabel>
												<Field
													labelId="select-primary"
													component={Select}
													variant="outlined"
													name="primaryColor"
												>
													<MenuItem value="#00bcd4" className={classes.cyan}>
														Cyan
													</MenuItem>
													<MenuItem value="#4caf50" className={classes.green}>
														Green
													</MenuItem>
													<MenuItem value="#2196f3" className={classes.blue}>
														Blue
													</MenuItem>
													<MenuItem value="#f44336" className={classes.red}>
														Red
													</MenuItem>
													<MenuItem value="#3f51b5" className={classes.indigo}>
														Indigo
													</MenuItem>
													<MenuItem value="#ff9800" className={classes.orange}>
														Orange
													</MenuItem>
													<MenuItem value="#ff5722" className={classes.deepOrange}>
														Deep Orange
													</MenuItem>
													<MenuItem value="#e91e63" className={classes.pink}>
														Pink
													</MenuItem>
												</Field>
											</FormControl>
											<FormControl className={classes.selectInput}>
												<InputLabel id="select-primary">Secondary Colour</InputLabel>
												<Field
													labelId="select-primary"
													component={Select}
													variant="outlined"
													name="secondaryColor"
												>
													<MenuItem value="#00bcd4" className={classes.cyan}>
														Cyan
													</MenuItem>
													<MenuItem value="#4caf50" className={classes.green}>
														Green
													</MenuItem>
													<MenuItem value="#2196f3" className={classes.blue}>
														Blue
													</MenuItem>
													<MenuItem value="#f44336" className={classes.red}>
														Red
													</MenuItem>
													<MenuItem value="#3f51b5" className={classes.indigo}>
														Indigo
													</MenuItem>
													<MenuItem value="#ff9800" className={classes.orange}>
														Orange
													</MenuItem>
													<MenuItem value="#ff5722" className={classes.deepOrange}>
														Deep Orange
													</MenuItem>
													<MenuItem value="#e91e63" className={classes.pink}>
														Pink
													</MenuItem>
												</Field>
											</FormControl>
											<Divider className={classes.divider} />
											<Button
												variant="contained"
												color="secondary"
												type="submit"
												disabled={!isValid}
											>
												Save Profile
											</Button>
											<Typography variant="body1" className={classes.errorMessage}></Typography>
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
						<Button color="primary" variant="contained" onClick={() => setShowDeleteAccountModal(false)}>
							Cancel
						</Button>
					</CardActions>
				</Card>
			</Modal>
		</>
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
