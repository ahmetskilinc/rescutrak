import * as actions from "actions/actionTypes";

const initialState = {
	snackbarOpen: false,
	snackbarType: null,
	snackbarMessage: "",
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case actions.OPEN_SNACKBAR:
			const { snackbarOpen, snackbarMessage, snackbarType } = payload;
			return {
				...state,
				snackbarOpen,
				snackbarType,
				snackbarMessage,
			};
		case actions.CLOSE_SNACKBAR:
			return {
				...state,
				snackbarOpen: false,
				snackbarMessage: "",
			};
		default:
			return state;
	}
};
