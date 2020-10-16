import { compose, createStore, applyMiddleware } from "redux";
import { createFirestoreInstance } from "redux-firestore";
import { getFirebase } from "react-redux-firebase";
import thunk from "redux-thunk";
import { getFirestore } from "redux-firestore";

import firebase from "src/firebase";
import rootReducer from "./Reducers";

const composeEnhancers =
	process.env.NODE_ENV === "development" ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose : compose;

export const store = createStore(
	rootReducer,
	composeEnhancers(applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })))
);

export const rrfProps = {
	firebase,
	config: { userProfile: "users", useFirestoreForProfile: true },
	dispatch: store.dispatch,
	createFirestoreInstance,
};
