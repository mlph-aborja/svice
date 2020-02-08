import React from 'react';

// reactstrap components
import { Container, Col } from 'reactstrap';

// core components
import { LoginForm } from './form';
import { Login } from './login.service';
import './login.css';

import AuthUtil from '../../../../util/auth.util';
import { showAlert } from '../../../../../actions/alert-box.action';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class CustomerLoginPage extends React.Component {
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
		Login(this.formData).then(data => {
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
				AuthUtil.setAuthenticatedUser(data);
			}
		});
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

CustomerLoginPage.protoTypes = {
	showAlert: PropTypes.func.isRequired,
	alert: PropTypes.bool.isRequired,
	succcess: PropTypes.bool.isRequired,
	message: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
	alert: state.alertBox.show,
	succcess: state.alertBox.succcess,
	message: state.alertBox.message
});

export default connect(mapStateToProps, { showAlert })(CustomerLoginPage);
