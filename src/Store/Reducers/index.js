import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";

import authReducer from "./authReducer";
import patientReducer from "./patientReducer";
import themeReducer from "./themeReducer";
import snackbarReducer from "./snackbarReducer";

export default combineReducers({
	auth: authReducer,
	patient: patientReducer,
	theme: themeReducer,
	firebase: firebaseReducer,
	snackbar: snackbarReducer,
	firestore: firestoreReducer,
});
