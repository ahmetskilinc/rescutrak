import * as actions from "./actionTypes";

export const addPatient = (data) => async (dispatch, getState, { getFirebase }) => {
	const firestore = getFirebase().firestore();
	const userId = getState().firebase.auth.uid;
	const { name, status, species, colour, dateOut, rescuer } = data;
	dispatch({ type: actions.ADD_PATIENT_START });
	await firestore
		.collection(`patients/${userId}/patients`)
		.doc()
		.set({
			name,
			status,
			species,
			colour,
			dateAdded: new Date().toDateString(),
			dateOut,
			rescuer,
		})
		.then(() => {
			dispatch({ type: actions.ADD_PATIENT_SUCCESS });
			dispatch({
				type: actions.OPEN_SNACKBAR,
				payload: {
					snackbarOpen: true,
					snackbarType: "success",
					snackbarMessage: "Patient has been added successfully",
				},
			});
		})
		.catch((err) => {
			dispatch({ type: actions.ADD_PATIENT_FAIL, payload: err.message });
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
