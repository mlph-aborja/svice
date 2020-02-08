import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

// styles for this kit
import '../assets/css/bootstrap.min.css';
import '../assets/scss/now-ui-kit.scss';
import '../assets/demo/demo.css';
import '../assets/demo/nucleo-icons-page-styles.css';
import '../../src/index.css';

import CustomerSignUpPage from './views/pages/customer/signup/signup.page';
import CustomerLoginPage from './views/pages/customer/login/login.page';
import AdminLoginPage from './views/pages/admin/login/login.page';
import AlertBox from './components/alert-box';

export default function App(props) {
	return (
		<BrowserRouter>
			<AlertBox />
			<Switch>
				<Switch>
					<Route
						path='/signup'
						render={props => <CustomerSignUpPage {...props} />}
					/>
					<Route
						path='/login'
						render={props => <CustomerLoginPage {...props} />}
					/>
					<Route
						path='/admin/login'
						render={props => <AdminLoginPage {...props} />}
					/>
					<Redirect from='/' to='/login' />
				</Switch>
			</Switch>
		</BrowserRouter>
	);
}
