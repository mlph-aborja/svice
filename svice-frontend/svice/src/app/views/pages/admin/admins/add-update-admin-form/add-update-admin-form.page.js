import React, { Component } from 'react';
import AddUpdateForm from '../../../../../components/form/add-update/add-update.form';
import { connect } from 'react-redux';
import { authenticateUser, logoutUser } from '../../../../../actions/auth.action';
import PropTypes from 'prop-types';
import { Container, Button , Table, Col} from 'reactstrap';
import { findAllAdmin } from '../../../../../services/user.service';
import { showAlert } from '../../../../../actions/alert-box.action';
import { register, findByUserId, updateUser } from '../../../../../services/user.service';

class AddUpdateAdminFormPage extends Component {
	constructor(props) {
			super(props);
			this.formData = {};
			this.state = {
				...props,
				errors: [],
				loading: false,
				formData: this.formData
		};
		
	}

	componentWillMount() {
		const id = this.props.match.params.id;
		if (id) {
			findByUserId(id).then(data => {
				if (data.errors) {
					this.setState({
						loading: false,
						errors: data.errors
					});
	
					this.props.showAlert(true, false, data.message);
				} else {
					this.setState({
						formData: data.data.user
					});
				}
			});
		}
	}

	onSubmit = event => {
			event.preventDefault();
			this.setState({
				loading: true
			});
			const formData = this.state.formData;

			if (formData.id) {
				this.onUpdate(formData);
			} else {
				this.onRegister(formData);
			}
			
		};

	onUpdate(formData) {
		// TODO
		updateUser(formData).then(data => console.log(data));
	}

	onRegister(formData) {
		register(formData, 'admins').then(data => {
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
				this.props.history.push('/admin/admins');
				this.props.showAlert(true, true, 'You successfully add new Admin Account');
			}
		});
	}

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
					name: 'first_name',
					type: 'text',
					placeholder: 'First Name',
					icon: 'users_circle-08',
					value: this.state.formData.first_name
				},
				{
					required: true,
					name: 'last_name',
					type: 'text',
					placeholder: 'Last Name',
					icon: 'users_circle-08',
					value: this.state.formData.last_name
				},
				{
					required: true,
					name: 'email',
					type: 'email',
					placeholder: 'Email',
					icon: 'ui-1_email-85',
					value: this.state.formData.email
				},
				{
					required: true,
					name: 'password',
					type: 'password',
					placeholder: 'Password',
					icon: 'ui-1_lock-circle-open',
				},
				{
					required: true,
					name: 'password_confirmation',
					type: 'password',
					placeholder: 'Password Confirmation',
					icon: 'ui-1_lock-circle-open',
				}
			];

		return(
		<Container>
				<h4 className="display-5 table-title">Admins</h4>
		<AddUpdateForm
			fields={fields}
			errors={this.state.errors}
			loading={this.state.loading}
			onSubmit={this.onSubmit}
			onInputChange={this.onInputChange}/>
			</Container> 
		
		);
	}
}

AddUpdateAdminFormPage.propTypes = {
	logoutUser: PropTypes.func.isRequired,
	authenticated_user: PropTypes.object.isRequired,
	access_token: PropTypes.string.isRequired,
	isAuthenticated: PropTypes.bool.isRequired,

	showAlert: PropTypes.func.isRequired,
	alert: PropTypes.bool.isRequired,
	success: PropTypes.bool.isRequired,
	message: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
	alert: state.alertBox.show,
	success: state.alertBox.success,
	message: state.alertBox.message,

	authenticated_user: state.auth.authenticated_user,
	access_token: state.auth.access_token,
	isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { 
	showAlert, authenticateUser, logoutUser })(
	AddUpdateAdminFormPage
);

