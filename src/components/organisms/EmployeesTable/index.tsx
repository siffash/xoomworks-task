import React from 'react';
import { Link, withRouter } from "react-router-dom";
import clsx from 'clsx';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from "@material-ui/core/TableHead";
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import SearchIcon from '@material-ui/icons/Search';

import { TableHeadProps, EmployeesTableProps } from './interfaces';
import { Employee } from '../../../interfaces/employee';
import { Order } from '../../../interfaces/order';

import { headCells, useToolbarStyles, useStyles } from './constants';
import { getComparator } from '../../../helpers/getComparator';
import { stableSort } from '../../../helpers/stableSort';

function CustomTableHead(props: TableHeadProps) {
	const { classes, order, orderBy, onRequestSort } = props;
	const createSortHandler = (property: keyof Employee) => (event: React.MouseEvent<unknown>) => {
		onRequestSort(event, property);
	};

	return (
		<TableHead>
			<TableRow>
				{headCells.map(headCell => (
					<TableCell
						key={headCell.id}
						sortDirection={orderBy === headCell.id ? order : false}
						style={{ width: headCell.width }}
					>
						{headCell.sortable ? (
							<TableSortLabel
								active={orderBy === headCell.id}
								direction={orderBy === headCell.id ? order : 'asc'}
								onClick={createSortHandler(headCell.id)}
							>
								{headCell.label}
								{orderBy === headCell.id && (
									<span className={classes.visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </span>
								)}
							</TableSortLabel>
						) : headCell.label}
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
}

const TableToolbar = () => {
	const classes = useToolbarStyles();

	return (
		<Toolbar
			className={clsx(classes.root, {
				[classes.highlight]: false,
			})}
		>
			<Grid container justify="space-between">
				<Grid item xs={9}>
					<Typography className={classes.title} variant="h6" id="tableTitle">
						Employees List View
					</Typography>
				</Grid>
				<Link to="/employee/create" style={{ textDecoration: 'none' }}>
					<Button
						variant="contained"
						color="primary"
						endIcon={<PersonAddIcon />}
					>
						Add Employee
					</Button>
				</Link>
			</Grid>
		</Toolbar>
	);
};

export const EmployeesTable = withRouter(({ rows, history }: EmployeesTableProps) => {
	const classes = useStyles();
	const [order, setOrder] = React.useState<Order>('asc');
	const [orderBy, setOrderBy] = React.useState<keyof Employee>('id');
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);
	const [filterInput, setFilterInput] = React.useState('');

	const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Employee) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};

	const goToEmployee = (id: number) => history.push(`/employee/view/${id}`);

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		setFilterInput(value);
	};

	const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

	return (
		<div className={classes.root}>
			<Paper className={classes.paper}>
				<TableToolbar />
				<Grid container justify="center">
						<TextField
							value={filterInput}
							onChange={handleFilterChange}
							fullWidth
							placeholder="Search by name"
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<SearchIcon />
									</InputAdornment>
								),
							}}
						/>
				</Grid>
				<TableContainer>
					<Table
						className={classes.table}
						aria-labelledby="tableTitle"
						size="medium"
					>
						<CustomTableHead
							classes={classes}
							order={order}
							orderBy={orderBy}
							onRequestSort={handleRequestSort}
							rowCount={rows.length}
						/>
						<TableBody>
							{stableSort(rows, getComparator(order, orderBy))
								.filter(({ employee_name }) => employee_name.toLowerCase().includes(filterInput.toLowerCase()))
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((row, index) => {
									const labelId = `table-${index}`;

									return (
										<TableRow
											hover
											onClick={() => goToEmployee(row.id)}
											tabIndex={-1}
											key={row.id}
											className={classes.row}
										>
											<TableCell component="th" id={labelId} scope="row">
												{row.id}
											</TableCell>
											<TableCell>{row.employee_name}</TableCell>
											<TableCell>{row.employee_salary}</TableCell>
											<TableCell>{row.employee_age}</TableCell>
											<TableCell>
												{
													row.profile_image
														? <img width={50} src={row.profile_image} alt='employee profile' />
														: 'No image'
												}
											</TableCell>
										</TableRow>
									);
								})}
							{emptyRows > 0 && (
								<TableRow style={{ height: 53 * emptyRows }}>
									<TableCell colSpan={6} />
								</TableRow>
							)}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[5, 10, 25]}
					component="div"
					count={rows.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onChangePage={handleChangePage}
					onChangeRowsPerPage={handleChangeRowsPerPage}
				/>
			</Paper>
		</div>
	);
});
