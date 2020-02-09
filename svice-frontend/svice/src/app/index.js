import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

// styles for this kit
import '../assets/css/bootstrap.min.css';
import '../assets/scss/now-ui-kit.scss';
import '../assets/demo/demo.css';
import '../assets/demo/nucleo-icons-page-styles.css';
import '../../src/index.css';

import { GuardProvider, GuardedRoute } from 'react-router-guards';
import AlertBox from './components/alert-box';
import AppNavbar from './components/navbars/AppNavbar';
import hideNavbar from './actions/navbar.action';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import authGuard from './guards/auth.guard';
import roleGuard from './guards/role.guard';
import {
	CustomerHomePage,
	CustomerLoginPage,
	CustomerSignUpPage
} from './views/pages/customer';

import { AdminLoginPage, AdminProfilePage } from './views/pages/admin';

const App = props => {
	const hideNavigationBar = () => {
		return props.isAuthenticated ? (
			<React.Fragment>
				<AppNavbar />
				<h1>HELLOW</h1>
			</React.Fragment>
		) : null;
	};

	return (
		<BrowserRouter>
			<AlertBox />
			<GuardProvider>
				<GuardedRoute
					path='/signup'
					exact
					render={props => <CustomerSignUpPage {...props} />}
				/>
				<GuardProvider guards={[authGuard]}>
					<GuardedRoute
						path='/admin/login'
						exact
						render={props => <AdminLoginPage {...props} />}
					/>
					<GuardedRoute
						path='/login'
						exact
						render={props => <CustomerLoginPage {...props} />}
					/>
					<GuardedRoute
						path='/admin/profile'
						exact
						render={props => <AdminProfilePage {...props} />}
					/>
					<GuardedRoute
						path='/'
						exact
						render={props => <CustomerHomePage {...props} />}
					/>
				</GuardProvider>
			</GuardProvider>
		</BrowserRouter>
	);
};

App.propTypes = {
	hideNavbar: PropTypes.func.isRequired,
	hide: PropTypes.bool.isRequired,
	isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
	hide: state.navbar.hide,
	isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { hideNavbar })(App);
