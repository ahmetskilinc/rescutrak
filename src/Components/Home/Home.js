import React from "react";
import "./Home.css";
import { Typography } from "@material-ui/core";
import { connect } from "react-redux";
import { Skeleton } from "@material-ui/lab";

const Home = ({ rescueName, loaded }) => (
	<Typography variant="h4">{loaded ? `Hello, ${rescueName}` : <Skeleton width="260px" height="62px" />}</Typography>
);

const mapStateToProps = ({ firebase }) => ({
	rescueName: firebase.profile.rescueName,
	loaded: firebase.profile.isLoaded,
});

export default connect(mapStateToProps, null)(Home);
