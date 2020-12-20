import React from "react";
import { Typography, Card, CardContent } from "@material-ui/core";
import { connect } from "react-redux";
import CuteBird from "./CuteBird";

const Home = ({ rescueName, loaded }) => (
	<Card>
		<CardContent>
			<Typography color="textSecondary">{loaded ? `Hello, ${rescueName}` : ""}</Typography>
			<CuteBird />
		</CardContent>
	</Card>
);

const mapStateToProps = ({ firebase }) => ({
	rescueName: firebase.profile.rescueName,
	loaded: firebase.profile.isLoaded,
});

export default connect(mapStateToProps, null)(Home);
