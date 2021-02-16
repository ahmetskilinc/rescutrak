import * as actions from "./actionTypes";

export const signUp = (data) => async (dispatch, getState, { getFirebase }) => {
	const firestore = getFirebase().firestore();
	const firebase = getFirebase();

	dispatch({ type: actions.AUTH_START });

	await firebase
		.auth()
		.createUserWithEmailAndPassword(data.email, data.password)
		.then((res) => {
			res.user.sendEmailVerification();

			firestore.collection("users").doc(res.user.uid).set({
				firstName: data.firstName,
				lastName: data.lastName,
				email: data.email,
				rescueName: data.rescueName,
				darkMode: false,
				primaryColor: "#00bcd4",
				secondaryColor: "#4caf50",
				fileUrl: "",
			});
			dispatch({ type: actions.AUTH_SUCCESS });
			dispatch({
				type: actions.OPEN_SNACKBAR,
				payload: {
					snackbarOpen: true,
					snackbarType: "success",
					snackbarMessage: `${data.firstName} your account has been created successfully!`,
				},
			});
		})
		.catch((error) => {
			dispatch({ type: actions.AUTH_FAIL, payload: error.message });
			dispatch({
				type: actions.OPEN_SNACKBAR,
				payload: {
					snackbarOpen: true,
					snackbarType: "error",
					snackbarMessage: error.message,
				},
			});
		});
};

export const signOut = () => async (dispatch, getState, { getFirebase }) => {
	const firebase = getFirebase();
	try {
		await firebase.auth().signOut();
	} catch (err) {
		console.log(err.message);
	}
};

export const signIn = (data) => async (dispatch, getState, { getFirebase }) => {
	const firebase = getFirebase();
	dispatch({ type: actions.AUTH_START });
	await firebase
		.auth()
		.signInWithEmailAndPassword(data.email, data.password)
		.then(() => {
			dispatch({ type: actions.AUTH_SUCCESS });
		})
		.catch((error) => {
			dispatch({ type: actions.AUTH_FAIL, payload: error.message });
			dispatch({
				type: actions.OPEN_SNACKBAR,
				payload: {
					snackbarOpen: true,
					snackbarType: "error",
					snackbarMessage: error.message,
				},
			});
		});
};

export const verifyEmail = () => async (dispatch, getState, { getFirebase }) => {
	const firebase = getFirebase();
	dispatch({ type: actions.VERIFY_START });
	await firebase
		.auth()
		.currentUser.sendEmailVerification()
		.then(() => {
			dispatch({ type: actions.VERIFY_SUCCESS });
			dispatch({
				type: actions.OPEN_SNACKBAR,
				payload: {
					snackbarOpen: true,
					snackbarType: "success",
					snackbarMessage: "Verification email has been sent",
				},
			});
		})
		.catch((error) => {
			dispatch({ type: actions.VERIFY_FAIL, payload: error.message });
			dispatch({
				type: actions.OPEN_SNACKBAR,
				payload: {
					snackbarOpen: true,
					snackbarType: "error",
					snackbarMessage: error.message,
				},
			});
		});
};

export const recoverPassword = (data) => async (dispatch, getState, { getFirebase }) => {
	const firebase = getFirebase();
	dispatch({ type: actions.FORGOTTEN_START });
	await firebase
		.auth()
		.sendPasswordResetEmail(data.email)
		.then(() => {
			dispatch({ type: actions.FORGOTTEN_SUCCESS });
			dispatch({
				type: actions.OPEN_SNACKBAR,
				payload: {
					snackbarOpen: true,
					snackbarType: "success",
					snackbarMessage:
						"Password reset email will be sent if the email you entered corresponds with an account",
				},
			});
		})
		.catch((err) => {
			dispatch({ type: actions.FORGOTTEN_FAIL, payload: err.message });
			dispatch({
				type: actions.OPEN_SNACKBAR,
				payload: {
					snackbarOpen: true,
					snackbarType: "error",
					snackbarMessage: err.message,
				},
			});
		});
};

export const editProfile = (data) => async (dispatch, getState, { getFirebase }) => {
	const firebase = getFirebase();
	const firestore = getFirebase().firestore();
	const user = firebase.auth().currentUser;
	const { uid: userId, email: userEmail } = getState().firebase.auth;
	dispatch({ type: actions.PROFILE_EDIT_START });
	if (data.email !== userEmail) {
		await user.updateEmail(data.email).then(() => {
			user.sendEmailVerification();
		});
	}

	await firestore
		.collection("users")
		.doc(userId)
		.update({
			firstName: data.firstName,
			lastName: data.lastName,
			rescueName: data.rescueName,
			email: data.email,
		})
		.then(() => {
			dispatch({ type: actions.PROFILE_EDIT_SUCCESS });
			dispatch({
				type: actions.OPEN_SNACKBAR,
				payload: {
					snackbarOpen: true,
					snackbarType: "success",
					snackbarMessage: "Profile updated",
				},
			});
		})
		.catch((err) => {
			dispatch({ type: actions.PROFILE_EDIT_FAIL, payload: err.message });
			dispatch({
				type: actions.OPEN_SNACKBAR,
				payload: {
					snackbarOpen: true,
					snackbarType: "error",
					snackbarMessage: err.message,
				},
			});
		});
};

export const uploadPhoto = (data) => async (dispatch, getState, { getFirebase }) => {
	const { uid } = getState().firebase.auth;
	const firebase = getFirebase();
	const fileExt = data[0].type.split("/")[1];
	const profileImage = new File([data[0]], `${uid}.${fileExt}`, { type: `image/${fileExt}` });
	dispatch({ type: actions.PROFILE_PHOTO_START });
	await firebase
		.uploadFile(`users/${uid}`, profileImage, "users")
		.then((res) => {
			console.log(res);
			firebase.firestore().collection("users").doc(uid).update({
				fileUrl: res.downloadURL,
			});
			dispatch({ type: actions.PROFILE_PHOTO_SUCCESS });
			dispatch({
				type: actions.OPEN_SNACKBAR,
				payload: {
					snackbarOpen: true,
					snackbarType: "success",
					snackbarMessage: "Profile photo uploaded",
				},
			});
		})
		.catch((error) => {
			dispatch({ type: actions.PROFILE_PHOTO_ERROR });
			dispatch({
				type: actions.OPEN_SNACKBAR,
				payload: {
					snackbarOpen: true,
					snackbarType: "error",
					snackbarMessage: error.message,
				},
			});
		});
};

export const deleteAccount = () => async (dispatch, getState, { getFirebase }) => {
	const firebase = getFirebase();
	const user = firebase.auth().currentUser;
	dispatch({ type: actions.DELETE_ACCOUNT_START });
	await user
		.delete()
		.then(() => {
			dispatch({ type: actions.DELETE_ACCOUNT_SUCCESS });
		})
		.catch((err) => {
			dispatch({ type: actions.DELETE_ACCOUNT_FAIL, payload: err.message });
			dispatch({
				type: actions.OPEN_SNACKBAR,
				payload: {
					snackbarOpen: true,
					snackbarType: "error",
					snackbarMessage: err.message,
				},
			});
		});
	await firebase
		.firestore()
		.collection("patients")
		.doc(user.uid)
		.delete()
		.then(() => {
			firebase
				.firestore()
				.collection("users")
				.doc(user.uid)
				.delete()
				.then(() => {
					// dispatch({ type: actions.DELETE_ACCOUNT_SUCCESS });
				})
				.catch((err) => {
					console.log(err);
				});
		});
};

export const sendPasswordResetEmail = () => async (dispatch, getState, { getFirebase }) => {
	const firebase = getFirebase();
	const user = firebase.auth();
	const userEmail = getState().firebase.auth.email;
	dispatch({ type: actions.SEND_PASSWORD_RESET_EMAIL_START });
	await user
		.sendPasswordResetEmail(userEmail)
		.then(() => {
			dispatch({ type: actions.SEND_PASSWORD_RESET_EMAIL_SUCCESS });
			dispatch({
				type: actions.OPEN_SNACKBAR,
				payload: {
					snackbarOpen: true,
					snackbarType: "success",
					snackbarMessage: "A password reset email has been sent to your email address",
				},
			});
		})
		.catch((err) => {
			dispatch({ type: actions.SEND_PASSWORD_RESET_EMAIL_FAIL, payload: err.message });
			dispatch({
				type: actions.OPEN_SNACKBAR,
				payload: {
					snackbarOpen: true,
					snackbarType: "error",
					snackbarMessage: err.message,
				},
			});
		});
};

export const clean = () => ({
	type: actions.CLEAN_UP,
});
