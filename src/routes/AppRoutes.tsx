import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";

import ScrollToTop from './helpers/ScrollToTop';
import ListView from '../components/pages/ListView';
import ItemView from '../components/pages/ItemView';
import ItemForm from '../components/pages/ItemForm';

export default function AppRoutes() {
	return (
		<BrowserRouter>
			<ScrollToTop>
				<Switch>
					<Route exact path='/' component={ListView} />
					<Route exact path='/employee' component={ListView} />
					<Route exact path='/employee/create' component={ItemForm} />
					<Route exact path='/employee/view/:id' component={ItemView} />
					<Route exact path='/employee/edit/:id' component={ItemForm} />
				</Switch>
			</ScrollToTop>
		</BrowserRouter>
	);
}
