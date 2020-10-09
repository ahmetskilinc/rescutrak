import * as actions from "./actionTypes";

export const toggleDarkMode = (data) => async (dispatch, getState, { getFirebase }) => {
	const firestore = getFirebase().firestore();
	const userId = getState().firebase.auth.uid;
	dispatch({ type: actions.CHANGE_THEME_START });
	await firestore
		.collection("users")
		.doc(userId)
		.update({
			darkMode: data,
		})
		.then(() => {
			dispatch({ type: actions.CHANGE_THEME_SUCCESS });
			dispatch({
				type: actions.OPEN_SNACKBAR,
				payload: {
					snackbarOpen: true,
					snackbarType: "success",
					snackbarMessage: "Theme mode toggled",
				},
			});
		})
		.catch((err) => {
			dispatch({ type: actions.CHANGE_THEME_FAIL, payload: err.message });
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

export const updateTheme = (data) => async (dispatch, getState, { getFirebase }) => {
	const firestore = getFirebase().firestore();
	const userId = getState().firebase.auth.uid;
	dispatch({ type: actions.CHANGE_THEME_START });
	await firestore
		.collection("users")
		.doc(userId)
		.update({
			primaryColor: data.primaryColor,
			secondaryColor: data.secondaryColor,
		})
		.then(() => {
			dispatch({ type: actions.CHANGE_THEME_SUCCESS });
			dispatch({
				type: actions.OPEN_SNACKBAR,
				payload: {
					snackbarOpen: true,
					snackbarType: "success",
					snackbarMessage: "Theme updated successfully",
				},
			});
		})
		.catch((err) => {
			dispatch({ type: actions.CHANGE_THEME_FAIL, payload: err.message });
			dispatch({
				type: actions.OPEN_SNACKBAR,
				payload: {
					snackbarOpen: true,
					snackbarType: "error",
					snackbarMessage: err.message,
				},
			});
		});

	console.log(data);
};
