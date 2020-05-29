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
		const { id } = this.props.match.params;
		employeeClient
			.get(`employee/${id}`)
			.then(({ data: employee }) => this.setState({ employee }))
			.catch(console.error);
	}

	render(): ReactNode {
		const { employee } = this.state;
		const items = [
			{ name: 'ID', value: employee.id, icon: <FingerprintIcon /> },
			{ name: 'Name', value: employee.employee_name, icon: <AccountCircleIcon /> },
			{ name: 'Salary', value: employee.employee_salary, icon: <PaymentIcon /> },
			{ name: 'Age', value: employee.employee_age, icon: <HourglassEmptyIcon /> },
		];

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
				<br /><br /><br />
				<Grid container justify="space-evenly">
					{items.map(({ name, value, icon }, index) => (
						<React.Fragment key={name}>
							<Grid item>
								<ListItem>
									<ListItemAvatar>
										<Avatar>
											{icon}
										</Avatar>
									</ListItemAvatar>
									<ListItemText primary={name} secondary={value} />
								</ListItem>
							</Grid>
							{index + 1 !== items.length && <Divider orientation="vertical" flexItem />}
						</React.Fragment>
					))}
				</Grid>
			</div>
		);
	}
}

export default ItemView;
