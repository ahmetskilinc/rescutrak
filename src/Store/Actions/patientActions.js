import * as actions from "./actionTypes";

export const addPatient = (data) => async (dispatch, getState, { getFirebase }) => {
	const firestore = getFirebase().firestore();
	const userId = getState().firebase.auth.uid;
	const { name, status, species, colour, rescuer } = data;
	dispatch({ type: actions.ADD_PATIENT_START });
	await firestore
		.collection(`patients/${userId}/patients`)
		.doc()
		.set({
			name,
			status,
			species,
			colour,
			dateAdded: new Date(),
			dateOut: new Date(),
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

export const editPatient = (data, patientId) => async (dispatch, getState, { getFirebase }) => {
	const firestore = getFirebase().firestore();
	const userId = getState().firebase.auth.uid;
	const id = patientId;
	const { name, status, species, colour, dateOut, rescuer, dateAdded } = data;
	dispatch({ type: actions.EDIT_PATIENT_START });
	await firestore
		.collection(`patients/${userId}/patients`)
		.doc(id)
		.update({
			name,
			status,
			species,
			colour,
			dateAdded,
			dateOut,
			rescuer,
		})
		.then(() => {
			dispatch({ type: actions.EDIT_PATIENT_SUCCESS });
			dispatch({
				type: actions.OPEN_SNACKBAR,
				payload: {
					snackbarOpen: true,
					snackbarType: "success",
					snackbarMessage: "Patient has been updated successfully",
				},
			});
		})
		.catch((err) => {
			dispatch({ type: actions.EDIT_PATIENT_FAIL, payload: err.message });
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

export const deletePatient = (patientId) => async (dispatch, getState, { getFirebase }) => {
	const firestore = getFirebase().firestore();
	const userId = getState().firebase.auth.uid;
	const id = patientId;
	dispatch({ type: actions.DELETE_PATIENT_START });
	await firestore
		.collection(`patients/${userId}/patients`)
		.doc(id)
		.delete()
		.then(() => {
			dispatch({ type: actions.DELETE_PATIENT_SUCCESS });
			dispatch({
				type: actions.OPEN_SNACKBAR,
				payload: {
					snackbarOpen: true,
					snackbarType: "success",
					snackbarMessage: "Patient has been deleted",
				},
			});
		})
		.catch((err) => {
			dispatch({ type: actions.DELETE_PATIENT_FAIL, payload: err.message });
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
