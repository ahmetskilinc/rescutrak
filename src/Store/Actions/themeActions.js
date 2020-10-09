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
		})
		.catch((err) => {
			dispatch({ type: actions.CHANGE_THEME_FAIL, payload: err.message });
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
		})
		.catch((err) => {
			dispatch({ type: actions.CHANGE_THEME_FAIL, payload: err.message });
		});

	console.log(data);
};
