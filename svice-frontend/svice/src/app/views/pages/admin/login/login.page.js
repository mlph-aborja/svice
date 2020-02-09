import React from 'react';

// reactstrap components
import { Container, Col } from 'reactstrap';

// core components
import { LoginForm } from './form';
import './login.css';

import AuthUtil from '../../../../util/auth.util';
import { showAlert } from '../../../../actions/alert-box.action';
import { authenticateUser } from '../../../../actions/auth.action';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../../../../services/user.service';

class AdminLoginPage extends React.Component {
	constructor(props) {
		super(props);
		this.formData = {};
		this.state = {
			...props,
			errors: [],
			loading: false
		};

		this.onInitPage();
	}

	onInitPage() {
		document.body.classList.add('login-page');
		document.body.classList.add('sidebar-collapse');
		document.documentElement.classList.remove('nav-open');
		window.scrollTo(0, 0);
		document.body.scrollTop = 0;
	}

	onSubmit = event => {
		event.preventDefault();
		this.setState({
			loading: true
		});
		login(this.formData).then(data => {
			if (data.message) {
				this.setState({
					loading: false,
					errors: data.errors || {}
				});

				// Show Alert
				this.props.showAlert(true, false, data.message);
			} else {
				this.setState({
					loading: false,
					errors: []
				});

				// Show Alert
				this.props.showAlert(true, true, 'Success Login');

				// Set Authenticated User
				this.onAuthenticateUser(data);

				// Redirect to admin profile page
				this.props.history.push('/admin/profile');
			}
		});
	};

	onAuthenticateUser = data => {
		// Save to local storage
		AuthUtil.setAuthenticatedUser(data);

		// Set state
		this.props.authenticateUser(data.user, data.access_token);
	};

	onInputChange = (name, value) => {
		this.formData[name] = value;
	};

	componentWillUnmount() {
		this.props.showAlert(false, false, '');
	}

	render() {
		const fields = [
			{
				required: true,
				name: 'email',
				type: 'email',
				placeholder: 'Email',
				icon: 'ui-1_email-85'
			},
			{
				required: true,
				name: 'password',
				type: 'password',
				placeholder: 'Password',
				icon: 'ui-1_lock-circle-open'
			}
		];

		return (
			<React.Fragment>
				<div className='page-header clear-filter' filter-color='blue'>
					<div
						className='page-header-image'
						style={{
							backgroundImage: 'url(' + require('assets/img/login.jpg') + ')'
						}}
					></div>
					<div className='content'>
						<Container>
							<Col className='ml-auto mr-auto' md='4'>
								<LoginForm
									fields={fields}
									errors={this.state.errors}
									loading={this.state.loading}
									title={process.env.REACT_APP_TITLE}
									onSubmit={this.onSubmit}
									onInputChange={this.onInputChange}
								/>
							</Col>
						</Container>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

AdminLoginPage.propTypes = {
	showAlert: PropTypes.func.isRequired,
	alert: PropTypes.bool.isRequired,
	succcess: PropTypes.bool.isRequired,
	message: PropTypes.string.isRequired,

	authenticateUser: PropTypes.func.isRequired,
	authenticated_user: PropTypes.object.isRequired,
	access_token: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
	alert: state.alertBox.show,
	succcess: state.alertBox.success,
	message: state.alertBox.message,

	authenticated_user: state.auth.authenticated_user,
	access_token: state.auth.access_token
});

export default connect(mapStateToProps, { showAlert, authenticateUser })(
	AdminLoginPage
);
