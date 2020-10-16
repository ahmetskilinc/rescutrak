import React from "react";
import { useSelector } from "react-redux";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import { ReactReduxFirebaseProvider, isLoaded } from "react-redux-firebase";

import { Provider } from "react-redux";
import { store, rrfProps } from "store";
import { CircularProgress } from "@material-ui/core";

const root = document.getElementById("root");

function AuthIsLoaded({ children }) {
	const auth = useSelector((state) => state.firebase.auth);
	if (!isLoaded(auth))
		return (
			<div className="spinnerWrapper">
				<CircularProgress />
			</div>
		);
	return children;
}

ReactDOM.render(
	<Provider store={store}>
		<ReactReduxFirebaseProvider {...rrfProps}>
			<AuthIsLoaded>
				<App />
			</AuthIsLoaded>
		</ReactReduxFirebaseProvider>
	</Provider>,
	root
);

serviceWorker.register();
