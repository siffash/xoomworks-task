import React, { FC } from 'react';
import { useTable, useGlobalFilter, useSortBy } from 'react-table';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';

import { Props } from './interfaces';

export const CustomTable: FC<Props> = ({ columns, data }) => {
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
	} = useTable(
		{
			columns,
			data,
		},
		useGlobalFilter,
		useSortBy,
	);

	return (
		<Table {...getTableProps()}>
			<TableHead>
			{headerGroups.map(headerGroup => (
				<TableRow {...headerGroup.getHeaderGroupProps()}>
					{headerGroup.headers.map(column => (
						<TableCell {...column.getHeaderProps()}>{column.render('Header')}</TableCell>
					))}
				</TableRow>
			))}
			</TableHead>
			<TableBody {...getTableBodyProps()}>
			{rows.map((row, i) => {
				prepareRow(row);
				return (
					<TableRow {...row.getRowProps()}>
						{row.cells.map(cell => <TableCell {...cell.getCellProps()}>{cell.render('Cell')}</TableCell>)}
					</TableRow>
				);
			})}
			</TableBody>
		</Table>
	);
}
