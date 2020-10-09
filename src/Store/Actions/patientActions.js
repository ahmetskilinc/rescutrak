import * as actions from "./actionTypes";

export const addPatient = (data) => async (dispatch, getState, { getFirebase }) => {
	const firestore = getFirebase().firestore();
	// const firebase = getFirebase();
	// const userId = getState().firebase.auth.uid;
	// const { name, species, dateOut } = data;
	dispatch({ type: actions.ADD_PATIENT_START });

	try {
		console.log(firestore);
	} catch (error) {
		console.log(error);
	}

	// await firestore
	// 	.collection(`patients/${userId}/patients`)
	// 	.doc()
	// 	.set({
	// 		name,
	// 		species,
	// 		dateAdded: firebase.FieldValue.serverTimestamp(),
	// 		dateOut,
	// 	})
	// 	.then(() => {
	// 		dispatch({ type: actions.ADD_PATIENT_SUCCESS });
	// 	})
	// 	.catch((err) => {
	// 		dispatch({ type: actions.ADD_PATIENT_FAIL, payload: err.message });
	// 	});
};
