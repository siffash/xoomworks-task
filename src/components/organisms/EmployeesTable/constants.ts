import { createStyles, lighten, makeStyles, Theme } from "@material-ui/core/styles";
import { HeadCell } from './interfaces';

export const headCells: HeadCell[] = [
	{ id: 'id', label: 'ID', width: '10%', sortable: true },
	{ id: 'employee_name', label: 'Name', width: '35%', sortable: true },
	{ id: 'employee_salary', label: 'Salary', width: '15%', sortable: true },
	{ id: 'employee_age', label: 'Age', width: '20%', sortable: true },
	{ id: 'profile_image', label: 'Image', width: '20%', sortable: false },
];

export const useToolbarStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			paddingLeft: theme.spacing(2),
			paddingRight: theme.spacing(1),
		},
		highlight:
			theme.palette.type === 'light'
				? {
					color: theme.palette.secondary.main,
					backgroundColor: lighten(theme.palette.secondary.light, 0.85),
				}
				: {
					color: theme.palette.text.primary,
					backgroundColor: theme.palette.secondary.dark,
				},
		title: {
			flex: '1 1 100%',
		},
	}),
);

export const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			width: '100%',
		},
		paper: {
			width: '100%',
			marginBottom: theme.spacing(2),
		},
		table: {
			minWidth: 750,
		},
		row: {
			cursor: 'pointer',
		},
		visuallyHidden: {
			border: 0,
			clip: 'rect(0 0 0 0)',
			height: 1,
			margin: -1,
			overflow: 'hidden',
			padding: 0,
			position: 'absolute',
			top: 20,
			width: 1,
		},
	}),
);
