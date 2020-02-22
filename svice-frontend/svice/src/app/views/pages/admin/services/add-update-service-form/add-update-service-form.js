import React, { Component } from 'react';
import AddUpdateForm from '../../../../../components/form/add-update/add-update.form';
import { connect } from 'react-redux';
import {
	authenticateUser,
	logoutUser
} from '../../../../../actions/auth.action';
import PropTypes from 'prop-types';
import { Container } from 'reactstrap';
import {
	findServiceById,
	saveService,
	updateService
} from '../../../../../services/service.service';
import { showAlert } from '../../../../../actions/alert-box.action';

class AddUpdateServiceForm extends Component {
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
			findServiceById(id).then(data => {
				this.setState({
					formData: data.data.service
				});
				this.formData = data.data.service;
			});
		}
	}

	onSubmit = event => {
		event.preventDefault();
		this.setState({
			loading: true
		});

		this.onActualSaving();
	};

	onActualSaving() {
		const id = this.props.match.params.id;

		if (id) {
			updateService(this.state.formData, id).then(data => {
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
					this.props.history.push('/admin/services');
					this.props.showAlert(true, true, 'You successfully updated Service');
				}
			});
		} else {
			saveService(this.state.formData, 'admins').then(data => {
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
					this.props.history.push('/admin/services');
					this.props.showAlert(true, true, 'You successfully add new Service');
				}
			});
		}
	}

	onInputChange = (name, value) => {
		this.formData[name] = value;
		this.setState({
			formData: this.formData
		});
	};

	componentWillUnmount() {
		this.props.showAlert(false, false, '');
	}

	render() {
		const fields = [
			{
				required: true,
				name: 'name',
				type: 'text',
				placeholder: 'name',
				icon: 'far fa-file-alt',
				value: this.state.formData.name || ''
			}
		];

		return (
			<Container>
				<h4 className='display-5 table-title'>Services</h4>
				<AddUpdateForm
					fields={fields}
					errors={this.state.errors}
					loading={this.state.loading}
					onSubmit={this.onSubmit}
					onInputChange={this.onInputChange}
				/>
			</Container>
		);
	}
}

AddUpdateServiceForm.propTypes = {
	logoutUser: PropTypes.func.isRequired,
	authenticated_user: PropTypes.object.isRequired,
	access_token: PropTypes.string.isRequired,
	isAuthenticated: PropTypes.bool.isRequired,

	showAlert: PropTypes.func.isRequired,
	alert: PropTypes.bool.isRequired,
	success: PropTypes.bool.isRequired,
	message: PropTypes.string.isRequired
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
	showAlert,
	authenticateUser,
	logoutUser
})(AddUpdateServiceForm);
