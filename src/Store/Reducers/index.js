import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";

import authReducer from "./authReducer";
import patientReducer from "./patientReducer";
import themeReducer from "./themeReducer";

export default combineReducers({
	auth: authReducer,
	patient: patientReducer,
	theme: themeReducer,
	firebase: firebaseReducer,
	firestore: firestoreReducer,
});
