import React from "react";
import { Typography } from "@material-ui/core";
import { connect } from "react-redux";

const Home = ({ rescueName, loaded }) => <Typography variant="h4">{loaded ? `Hello, ${rescueName}` : ""}</Typography>;

const mapStateToProps = ({ firebase }) => ({
	rescueName: firebase.profile.rescueName,
	loaded: firebase.profile.isLoaded,
});

export default connect(mapStateToProps, null)(Home);
