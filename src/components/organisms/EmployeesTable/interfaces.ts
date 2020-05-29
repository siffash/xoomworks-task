import React from 'react';
import { RouteComponentProps } from "react-router-dom";

import { useStyles } from './constants';
import { Employee } from '../../../interfaces/employee';
import { Order } from '../../../interfaces/order';

export interface HeadCell {
	id: keyof Employee;
	label: string;
	width: string;
	sortable: boolean;
}

export interface TableHeadProps {
	classes: ReturnType<typeof useStyles>;
	numSelected: number;
	onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Employee) => void;
	onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
	order: Order;
	orderBy: string;
	rowCount: number;
}

export interface TableToolbarProps {
	numSelected: number;
}

export interface EmployeesTableProps extends RouteComponentProps {
	rows: Array<Employee>;
}
