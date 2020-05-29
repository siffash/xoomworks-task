import React from 'react';
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
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
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

import { TableHeadProps, TableToolbarProps } from './interfaces';
import { Employee } from '../../../interfaces/employee';
import { Order } from '../../../interfaces/order';

import { headCells, useToolbarStyles, useStyles } from './constants';
import { getComparator } from '../../../helpers/getComparator';
import { stableSort } from '../../../helpers/stableSort';

function CustomTableHead(props: TableHeadProps) {
	const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
	const createSortHandler = (property: keyof Employee) => (event: React.MouseEvent<unknown>) => {
		onRequestSort(event, property);
	};

	return (
		<TableHead>
			<TableRow>
				<TableCell padding='checkbox'>
					<Checkbox
						indeterminate={numSelected > 0 && numSelected < rowCount}
						checked={rowCount > 0 && numSelected === rowCount}
						onChange={onSelectAllClick}
					/>
				</TableCell>
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

const TableToolbar = (props: TableToolbarProps) => {
	const classes = useToolbarStyles();
	const { numSelected } = props;

	return (
		<Toolbar
			className={clsx(classes.root, {
				[classes.highlight]: numSelected > 0,
			})}
		>
			{numSelected > 0 ? (
				<Typography className={classes.title} color="inherit" variant="subtitle1">
					{numSelected} selected
				</Typography>
			) : (
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

			)}
			{numSelected > 0 && (
				<Tooltip title="Delete">
					<IconButton aria-label="delete">
						<DeleteIcon />
					</IconButton>
				</Tooltip>
			)}
		</Toolbar>
	);
};

interface EmployeesTableProps extends RouteComponentProps {
	rows: Array<Employee>;
}

export const EmployeesTable = withRouter(({ rows, history }: EmployeesTableProps) => {
	const classes = useStyles();
	const [order, setOrder] = React.useState<Order>('asc');
	const [orderBy, setOrderBy] = React.useState<keyof Employee>('id');
	const [selected, setSelected] = React.useState<number[]>([]);
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);

	const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Employee) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};

	const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.checked) {
			const newSelecteds = rows.map(n => n.id);
			setSelected(newSelecteds);
			return;
		}
		setSelected([]);
	};

	const checkEmployee = (event: React.MouseEvent<unknown>, name: number) => {
		const selectedIndex = selected.indexOf(name);
		let newSelected: number[] = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, name);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(
				selected.slice(0, selectedIndex),
				selected.slice(selectedIndex + 1),
			);
		}

		setSelected(newSelected);
	};

	const goToEmployee = (id: number) => history.push(`/employee/view/${id}`);

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const isSelected = (name: number) => selected.indexOf(name) !== -1;

	const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

	return (
		<div className={classes.root}>
			<Paper className={classes.paper}>
				<TableToolbar numSelected={selected.length} />
				<TableContainer>
					<Table
						className={classes.table}
						aria-labelledby="tableTitle"
						size={'medium'}
						aria-label="enhanced table"
					>
						<CustomTableHead
							classes={classes}
							numSelected={selected.length}
							order={order}
							orderBy={orderBy}
							onSelectAllClick={handleSelectAllClick}
							onRequestSort={handleRequestSort}
							rowCount={rows.length}
						/>
						<TableBody>
							{stableSort(rows, getComparator(order, orderBy))
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((row, index) => {
									const isItemSelected = isSelected(row.id);
									const labelId = `enhanced-table-checkbox-${index}`;

									return (
										<TableRow
											hover
											onClick={() => goToEmployee(row.id)}
											tabIndex={-1}
											key={row.id}
											selected={isItemSelected}
											className={classes.row}
										>
											<TableCell padding='checkbox'>
												<Checkbox
													checked={isItemSelected}
													onClick={event => checkEmployee(event, row.id)}
													inputProps={{ 'aria-labelledby': labelId }}
												/>
											</TableCell>
											<TableCell component="th" id={labelId} scope="row">
												{row.id}
											</TableCell>
											<TableCell>{row.employee_name}</TableCell>
											<TableCell>{row.employee_salary}</TableCell>
											<TableCell>{row.employee_age}</TableCell>
											<TableCell>
												{
													row.profile_image
														? <img src={row.profile_image} alt='employee profile' />
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
