import * as actions from "actions/actionTypes";

const initialState = {
	error: null,
	loading: false,
	verifyEmail: {
		error: null,
		loading: false,
	},
	forgotten: {
		error: null,
		loading: false,
	},
	profileEdit: {
		error: null,
		loading: false,
	},
	deleteAccount: {
		error: null,
		loading: false,
	},
	passwordResetEmail: {
		loading: false,
		error: null,
	},
	profilePhoto: {
		loading: false,
		error: null,
	},
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case actions.CLEAN_UP:
			return {
				...state,
				error: null,
				loading: false,
				verifyEmail: {
					...state.verifyEmail,
					loading: false,
					error: null,
				},
			};
		case actions.AUTH_START:
			return {
				...state,
				loading: true,
			};
		case actions.AUTH_FAIL:
			return {
				...state,
				loading: false,
				error: payload,
			};
		case actions.AUTH_SUCCESS:
			return {
				...state,
				loading: false,
				error: false,
			};
		case actions.VERIFY_START:
			return {
				...state,
				verifyEmail: {
					...state.verifyEmail,
					loading: true,
				},
			};
		case actions.VERIFY_SUCCESS:
			return {
				...state,
				verifyEmail: {
					...state.verifyEmail,
					loading: false,
					error: false,
				},
			};
		case actions.VERIFY_FAIL:
			return {
				...state,
				verifyEmail: {
					...state.verifyEmail,
					loading: false,
					error: payload,
				},
			};
		case actions.FORGOTTEN_START:
			return {
				...state,
				forgotten: {
					...state.forgotten,
					loading: true,
				},
			};
		case actions.FORGOTTEN_SUCCESS:
			return {
				...state,
				forgotten: {
					...state.forgotten,
					loading: false,
					error: false,
				},
			};
		case actions.FORGOTTEN_FAIL:
			return {
				...state,
				forgotten: {
					...state.forgotten,
					loading: false,
					error: payload,
				},
			};
		case actions.PROFILE_EDIT_START:
			return {
				...state,
				profileEdit: {
					...state.profileEdit,
					loading: true,
				},
			};
		case actions.PROFILE_EDIT_SUCCESS:
			return {
				...state,
				profileEdit: {
					...state.profileEdit,
					loading: false,
					error: false,
				},
			};
		case actions.PROFILE_EDIT_FAIL:
			return {
				...state,
				profileEdit: {
					...state.profileEdit,
					loading: false,
					error: payload,
				},
			};

		case actions.DELETE_ACCOUNT_START:
			return {
				...state,
				deleteAccount: {
					...state.deleteAccount,
					loading: true,
				},
			};
		case actions.DELETE_ACCOUNT_SUCCESS:
			return {
				...state,
				deleteAccount: {
					...state.deleteAccount,
					loading: false,
					error: false,
				},
			};
		case actions.DELETE_ACCOUNT_FAIL:
			return {
				...state,
				deleteAccount: {
					...state.deleteAccount,
					loading: false,
					error: payload,
				},
			};

		case actions.SEND_PASSWORD_RESET_EMAIL_START:
			return {
				...state,
				passwordResetEmail: {
					...state.passwordResetEmail,
					loading: true,
				},
			};
		case actions.SEND_PASSWORD_RESET_EMAIL_SUCCESS:
			return {
				...state,
				passwordResetEmail: {
					...state.passwordResetEmail,
					loading: false,
					error: false,
				},
			};
		case actions.SEND_PASSWORD_RESET_EMAIL_FAIL:
			return {
				...state,
				passwordResetEmail: {
					...state.passwordResetEmail,
					loading: false,
					error: payload,
				},
			};

		case actions.PROFILE_PHOTO_START:
			return {
				...state,
				profilePhoto: {
					...state.profilePhoto,
					loading: true,
				},
			};
		case actions.PROFILE_PHOTO_SUCCESS:
			return {
				...state,
				profilePhoto: {
					...state.profilePhoto,
					loading: false,
					error: false,
				},
			};
		case actions.PROFILE_PHOTO_ERROR:
			return {
				...state,
				profilePhoto: {
					...state.profilePhoto,
					loading: false,
					error: payload,
				},
			};
		default:
			return state;
	}
};
