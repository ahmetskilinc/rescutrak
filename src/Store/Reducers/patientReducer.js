import * as actions from "../Actions/actionTypes";

const initialState = {
	error: null,
	loading: false,
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case actions.CLEAN_UP:
			return {
				...state,
				error: null,
				loading: false,
			};
		case actions.ADD_PATIENT_START:
			return {
				...state,
				loading: true,
			};
		case actions.ADD_PATIENT_FAIL:
			return {
				...state,
				error: payload,
			};
		case actions.ADD_PATIENT_SUCCESS:
			return {
				...state,
				loading: false,
				error: false,
			};
		default:
			return state;
	}
};
