import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";

import ListView from '../components/pages/ListView';
import ItemView from '../components/pages/ItemView';
import ScrollToTop from './helpers/ScrollToTop';

export default function AppRoutes() {
	return (
		<BrowserRouter>
			<ScrollToTop>
				<Switch>
					<Route exact path='/' component={ListView} />
					<Route exact path='/employee' component={ListView} />
					<Route exact path='/employee/create' component={ListView} />
					<Route exact path='/employee/view/:id' component={ItemView} />
					<Route exact path='/employee/edit/:id' component={ListView} />
				</Switch>
			</ScrollToTop>
		</BrowserRouter>
	);
}
