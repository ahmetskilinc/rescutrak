import {
	Avatar,
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	Divider,
	makeStyles,
	Typography,
} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import React from "react";

const useStyles = makeStyles((theme) => ({
	card: {
		maxWidth: 400,
		margin: "0 auto",
	},
	cardContent: {
		padding: theme.spacing(2),
	},
	avatarRow: {
		display: "flex",
		alignItems: "center",
	},
	large: {
		width: theme.spacing(7),
		height: theme.spacing(7),
	},
}));

const FakeProfile = () => {
	const classes = useStyles();
	return (
		<Card className={classes.card}>
			<CardHeader
				avatar={
					<Skeleton variant="circle">
						<Avatar className={classes.large} />
					</Skeleton>
				}
				title={
					<Typography>
						<Skeleton width="30%" />
					</Typography>
				}
				subheader={
					<Typography variant="body2" color="textSecondary">
						<Skeleton width="40%" />
					</Typography>
				}
			/>
			<CardContent className={classes.cardContent}>
				<Typography variant="body2" color="textSecondary"></Typography>
				<Typography variant="body2" color="textSecondary">
					<Skeleton width="35%" />
				</Typography>
				<Typography variant="body2" color="textSecondary">
					<Skeleton width="45%" />
				</Typography>
			</CardContent>
			<Divider />
			<CardActions className={classes.cardContent}>
				<Button variant="contained" color="primary" disabled={true}>
					Edit Account
				</Button>
			</CardActions>
		</Card>
	);
};

export default FakeProfile;
