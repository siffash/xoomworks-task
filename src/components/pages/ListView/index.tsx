import React, { PureComponent, ReactNode } from 'react';
import { Column } from 'react-table';

import { State } from './interfaces';
import { employeeClient } from '../../../helpers/employeeClient';
import { CustomTable } from '../../organisms/CustomTable';

export class ListView extends PureComponent<any, State>{
	state: State = {
		employees: [],
	};

	async componentDidMount() {
		employeeClient
			.get('employee')
			.then(({ data: employees }) => this.setState({ employees }))
			.catch(console.error);
	}

	tableColumns: Array<Column> = [
		{
			Header: 'ID',
			accessor: 'id',
		},
		{
			Header: 'Name',
			accessor: 'employee_name',
		},
		{
			Header: 'Age',
			accessor: 'employee_age',
		},
		{
			Header: 'Salary',
			accessor: 'employee_salary',
		},
		{
			Header: 'Image',
			Cell: ({ value }) => value ? <img src={value} /> : 'No image',
			accessor: 'profile_image',
		},
	];

	render(): ReactNode {
		const { employees } = this.state;

		return (
			<div>
				<CustomTable
					columns={this.tableColumns}
					data={employees}
				/>
			</div>
		);
	}
}
