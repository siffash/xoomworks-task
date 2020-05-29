import React, { PureComponent, ReactNode } from "react";
import { Link } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import Toolbar from "@material-ui/core/Toolbar";
import Divider from "@material-ui/core/Divider";
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PaymentIcon from '@material-ui/icons/Payment';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';

import { Props, State } from './interfaces';
import { employeeClient } from '../../../helpers/employeeClient';
import BackButton from "../../atoms/BackButton";


class ItemView extends PureComponent<Props, State> {
	state: State = {
		employee: {
			id: 0,
			employee_name: '',
			employee_age: 0,
			employee_salary: 0,
			profile_image: '',
		},
	};

	async componentDidMount() {
		const { id } = this.props.match?.params;
		employeeClient
			.get(`employee/${id}`)
			.then(({ data: employee }) => this.setState({ employee }))
			.catch(console.error);
	}

	render(): ReactNode {
		const { employee } = this.state;

		return (
			<div>
				<Toolbar>
					<Grid container justify="space-between">
						<Grid item xs={9}>
							<Typography variant="h6">
								<BackButton />
								Employee View
							</Typography>
						</Grid>
						<Link to={`/employee/edit/${employee.id}`} style={{ textDecoration: 'none' }}>
							<Button
								variant="contained"
								color="primary"
								endIcon={<PersonAddIcon />}
							>
								Edit Employee
							</Button>
						</Link>
					</Grid>
				</Toolbar>
				<br /><br />
				<Divider />
				<br /><br />
				<Grid container justify="space-evenly">
					<Grid item>
						<ListItem>
							<ListItemAvatar>
								<Avatar>
									<FingerprintIcon />
								</Avatar>
							</ListItemAvatar>
							<ListItemText primary="ID" secondary={employee.id} />
						</ListItem>
					</Grid>
					<Divider orientation="vertical" flexItem />
					<Grid item>
						<ListItem>
							<ListItemAvatar>
								<Avatar>
									<AccountCircleIcon />
								</Avatar>
							</ListItemAvatar>
							<ListItemText primary="Name" secondary={employee.employee_name} />
						</ListItem>
					</Grid>
					<Divider orientation="vertical" flexItem />
					<Grid item>
						<ListItem>
							<ListItemAvatar>
								<Avatar>
									<PaymentIcon />
								</Avatar>
							</ListItemAvatar>
							<ListItemText primary="Salary" secondary={employee.employee_salary} />
						</ListItem>
					</Grid>
					<Divider orientation="vertical" flexItem />
					<Grid item>
						<ListItem>
							<ListItemAvatar>
								<Avatar>
									<HourglassEmptyIcon />
								</Avatar>
							</ListItemAvatar>
							<ListItemText primary="Age" secondary={employee.employee_age} />
						</ListItem>
					</Grid>
				</Grid>
			</div>
		);
	}
}

export default ItemView;
