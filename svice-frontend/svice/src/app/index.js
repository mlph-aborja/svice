import React from 'react';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router-dom';

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
import {
	CustomerHomePage,
	CustomerLoginPage,
	CustomerSignUpPage
} from './views/pages/customer';

import { 
	AdminLoginPage, 
	AdminCustomersPage,
	AdminAdminsPage,
	AdminServicesPage } from './views/pages/admin';
const history = createBrowserHistory();

const App = props => {
	return (
		<Router history={history}>
			<AlertBox />
			<AppNavbar history={history} />
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
						path='/admin/customers'
						exact
						render={props => <AdminCustomersPage {...props} />}
					/>
					<GuardedRoute
						path='/admin/admins'
						exact
						render={props => <AdminAdminsPage {...props} />}
					/>
					<GuardedRoute
						path='/admin/services'
						exact
						render={props => <AdminServicesPage {...props} />}
					/>
					<GuardedRoute
						path='/'
						exact
						render={props => <CustomerHomePage {...props} />}
					/>
				</GuardProvider>
			</GuardProvider>
		</Router>
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
