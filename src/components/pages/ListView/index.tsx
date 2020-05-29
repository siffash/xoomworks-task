import React, { PureComponent, ReactNode } from 'react';
import { withRouter } from 'react-router-dom'

import { State } from './interfaces';
import { employeeClient } from '../../../helpers/employeeClient';
import { EmployeesTable } from '../../organisms/EmployeesTable';
import { Employee } from "../../../interfaces/employee";

class ListView extends PureComponent<any, State>{
	state: State = {
		employees: [],
	};

	async componentDidMount() {
		employeeClient
			.get('employee')
			.then(({ data: employees }) => this.setState({
				employees: employees.map((employee: Employee) => ({
					...employee,
					id: isNaN(employee.id) ? 0 : Number(employee.id),
					employee_salary: isNaN(employee.employee_salary) ? 0 : Number(employee.employee_salary),
					employee_age: isNaN(employee.employee_age) ? 0 : Number(employee.employee_age),
				}))
			}))
			.catch(console.error);
	}

	render(): ReactNode {
		const { employees } = this.state;

		return (
			<EmployeesTable rows={employees} />
		);
	}
}

export default withRouter(ListView);
