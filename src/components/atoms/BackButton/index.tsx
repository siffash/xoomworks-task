import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom"
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import IconButton from "@material-ui/core/IconButton";

const BackButton = ({ history }: RouteComponentProps) => (
	<IconButton onClick={history.goBack}>
		<ArrowBackIcon />
	</IconButton>
);

export default withRouter(BackButton);
