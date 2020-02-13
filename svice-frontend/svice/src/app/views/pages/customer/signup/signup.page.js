import React from 'react';
// reactstrap components
import { Container, Col } from 'reactstrap';

import { SignUpForm } from './form';
import './signup.css';
import { showAlert } from '../../../../actions/alert-box.action';
import hideNavbar from '../../../../actions/navbar.action';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { register } from '../../../../services/user.service';

class CustomerSignUpPage extends React.Component {
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

		register(this.formData, 'customers').then(data => {
			if (data.errors) {
				this.setState({
					loading: false,
					errors: data.errors
				});

				this.props.showAlert(true, false, data.message);
			} else {
				this.setState({
					loading: false,
					errors: []
				});
				this.props.history.push('/login');
				this.props.showAlert(true, true, 'You can now Sign in your account');
			}
		});
	};

	onInputChange = (name, value) => {
		this.formData[name] = value;
	};

	componentDidMount() {
		this.props.hideNavbar(true);
	}

	componentWillUnmount() {
		this.props.showAlert(false, false, '');
		this.props.hideNavbar(false);
	}

	render() {
		const fields = [
			{
				required: true,
				name: 'first_name',
				type: 'text',
				placeholder: 'First Name',
				icon: 'users_circle-08'
			},
			{
				required: true,
				name: 'last_name',
				type: 'text',
				placeholder: 'Last Name',
				icon: 'users_circle-08'
			},
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
			},
			{
				required: true,
				name: 'password_confirmation',
				type: 'password',
				placeholder: 'Password Confirmation',
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
								<SignUpForm
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

CustomerSignUpPage.propTypes = {
	showAlert: PropTypes.func.isRequired,
	alert: PropTypes.bool.isRequired,
	success: PropTypes.bool.isRequired,
	message: PropTypes.string.isRequired,
	location: PropTypes.object.isRequired,
	hide: PropTypes.bool.isRequired,
	hideNavbar: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	alert: state.alertBox.show,
	success: state.alertBox.success,
	message: state.alertBox.message,
	hide: state.navbar.hide
});

export default connect(mapStateToProps, { showAlert, hideNavbar })(
	CustomerSignUpPage
);
