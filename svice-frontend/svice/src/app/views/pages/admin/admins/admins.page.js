import React, { Component } from 'react';
import { connect } from 'react-redux';
import { authenticateUser, logoutUser } from '../../../../actions/auth.action';
import PropTypes from 'prop-types';
import { Container, Button, Table } from 'reactstrap';
import { findAllAdmin, deleteUser } from '../../../../services/user.service';
import { showAlert } from '../../../../actions/alert-box.action';
import AddEntryButton from '../../../../components/buttons/add-entry-button/add-entry-button';
import DeleteEntryButton from '../../../../components/buttons/delete-entry-button/delete-entry-button';

class AdminAdminsPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			...props,
			data: []
		};
	}

	componentDidMount() {
		this.onFetchAdmin();
	}

	onDelete(id) {
		deleteUser(id).then(data => {
			if (data.status === 200) {
				this.onFetchAdmin();
			}
		});
	}

	onFetchAdmin() {
		findAllAdmin().then(data => {
			if (data.message) {
				// Show Alert
				this.props.showAlert(true, false, data.message);
			} else {
				this.setState({
					data: data.data.users || []
				});
			}
		});
	}

	render() {
		return (
			<Container>
				<h4 className='display-5 table-title'>Admins</h4>
				<AddEntryButton
					history={this.props.history}
					redirectUrl='/admin/admins/add'
				/>
				<Table>
					<thead>
						<tr>
							<th>First Name</th>
							<th>Last Name</th>
							<th>Email</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{this.state.data.map((value, index) => {
							return (
								<tr key={index}>
									<td>{value.first_name}</td>
									<td>{value.last_name}</td>
									<td>{value.email}</td>
									<td>
										<DeleteEntryButton
											userId={value.id}
											onClick={() => this.onDelete(value.id)}
										/>
										<Button color='info'>
											<i className='fas fa-edit'></i>
										</Button>
									</td>
								</tr>
							);
						})}
					</tbody>
				</Table>
			</Container>
		);
	}
}

AdminAdminsPage.propTypes = {
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
})(AdminAdminsPage);
