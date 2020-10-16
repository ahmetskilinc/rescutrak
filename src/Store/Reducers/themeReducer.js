import * as actions from "actions/actionTypes";

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
		case actions.CHANGE_THEME_START:
			return {
				...state,
				loading: true,
			};
		case actions.CHANGE_THEME_FAIL:
			return {
				...state,
				error: payload,
			};
		case actions.CHANGE_THEME_SUCCESS:
			return {
				...state,
				loading: false,
				error: false,
			};
		default:
			return state;
	}
};
