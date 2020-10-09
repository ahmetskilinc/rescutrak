import { useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../Store/Actions";

const Logout = ({ logout }) => {
	useEffect(() => {
		logout();
	}, [logout]);

	return null;
};

const mapDispatchToProps = {
	logout: actions.signOut,
};

export default connect(null, mapDispatchToProps)(Logout);
