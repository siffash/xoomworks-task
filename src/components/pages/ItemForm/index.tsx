import React, { PureComponent, ReactNode, ChangeEvent } from "react";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import TextField from "@material-ui/core/TextField";
import DeleteIcon from '@material-ui/icons/Delete';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import Divider from "@material-ui/core/Divider";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import PaymentIcon from "@material-ui/icons/Payment";
import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty";
import ImageIcon from '@material-ui/icons/Image';
import InputAdornment from "@material-ui/core/InputAdornment";

import { employeeClient } from '../../../helpers/employeeClient';
import BackButton from "../../atoms/BackButton";
import { Props, State } from "./interfaces";

class ItemForm extends PureComponent<Props, State> {
	state: State = {
		isEdit: false,
		errorFields: [],
		id: 0,
		employee_name: '',
		employee_age: 0,
		employee_salary: 0,
		profile_image: '',
	};

	async componentDidMount() {
		const { id } = this.props.match.params;
		if (id) {
			this.setState({ isEdit: true });
			employeeClient
				.get(`employee/${id}`)
				.then(({ data: employee }) => this.setState(employee))
				.catch(console.error);
		}
	}

	requiredFields = ['employee_name', 'employee_salary', 'employee_age'];

	handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target || event;
		await this.setState({ [name]: value } as Pick<State, any>);
		if (this.requiredFields.includes(name)) {
			this.validation(name);
		}
	};

	validation = (field?: string): boolean => {
		const errorFields = [];
		const checkFields = field ? [field] : this.requiredFields;

		for (const requiredField of checkFields) {
			if (!(this.state as any)[requiredField]) {
				errorFields.push(requiredField);
			}
		}

		this.setState({ errorFields });

		return !errorFields.length;
	}

	submitEmployee = () => {
		if (this.validation()) {
			const { isEdit, id, employee_name, employee_salary, employee_age, profile_image } = this.state;
			employeeClient({
				method: isEdit ? 'put' : 'post',
				url: isEdit ? `/employee/${id}` : '/employee',
				data: { employee_name, employee_salary, employee_age, profile_image },
			})
				.then(() => {
					alert('Success!');
					this.props.history.push("/employee");
				})
				.catch(console.error);
		}
	};

	removeEmployee = () => {
		const { id } = this.state;
		employeeClient
			.delete(`/employee/${id}`)
			.then(() => {
				alert('Success!');
				this.props.history.push("/employee");
			})
			.catch(console.error);
	}

	render(): ReactNode {
		const { isEdit, errorFields, employee_name, employee_age, employee_salary, profile_image } = this.state;
		const items = [
			{ label: 'Name', name: 'employee_name', value: employee_name, icon: <AccountCircleIcon />, isRequired: true },
			{ label: 'Salary', name: 'employee_salary', value: employee_salary, icon: <PaymentIcon />, isRequired: true },
			{ label: 'Age', name: 'employee_age', value: employee_age, icon: <HourglassEmptyIcon />, isRequired: true },
			{ label: 'Profile Image', name: 'profile_image', value: profile_image, icon: <ImageIcon />, isRequired: false },
		];

		return (
			<div>
				<Toolbar>
					<Grid container justify="space-between">
						<Grid item xs={9}>
							<Typography variant="h6">
								<BackButton />
								Employee {isEdit ? 'Edit' : 'Create'}
							</Typography>
						</Grid>
						<span>
							<Button
								variant="contained"
								color={"primary"}
								endIcon={<SaveAltIcon />}
								onClick={this.submitEmployee}
							>
								{isEdit ? 'Update' : 'Create'} Employee
							</Button>
						</span>
					</Grid>
				</Toolbar>
				<br /><br />
				<Divider />
				<br /><br /><br />
				<Grid container justify="space-evenly">
					{items.map(({ label, name, value, isRequired, icon }, index) => (
						<React.Fragment key={name}>
							<Grid item>
								<TextField
									required={isRequired}
									error={errorFields.includes(name)}
									helperText={errorFields.includes(name) ? "Please fill out this field" : " "}
									name={name}
									label={label}
									value={value || ""}
									onChange={this.handleChange}
									variant="outlined"
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												{icon}
											</InputAdornment>
										),
									}}
								/>
							</Grid>
							{index + 1 !== items.length && <Divider orientation="vertical" flexItem />}
						</React.Fragment>
					))}
				</Grid>
				<br /><br />
				<Divider />
				<br /><br />
				{isEdit && (
					<Toolbar>
						<Grid container justify="space-between">
							<span>
								<Button
									variant="contained"
									color={"secondary"}
									endIcon={<DeleteIcon/>}
									onClick={this.removeEmployee}
								>
									Remove Employee
								</Button>
							</span>
						</Grid>
					</Toolbar>
				)}

			</div>
		);
	}
}

export default ItemForm;
