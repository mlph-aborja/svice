import React, { Component } from 'react';
import { connect } from 'react-redux';
import { authenticateUser, logoutUser } from '../../../../actions/auth.action';
import { showAlert } from '../../../../actions/alert-box.action';
import PropTypes from 'prop-types';
import { deleteUser, findAllCustomer } from '../../../../services/user.service';
import { Container, Table } from 'reactstrap';
import DeleteEntryButton from '../../../../components/buttons/delete-entry-button';
import EditEntryButton from '../../../../components/buttons/edit-entry-button';

class AdminCustomersPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			...props,
			data: []
		};
	}

	componentDidMount() {
		this.onFetchCustomer();
	}

	onDelete(id) {
		deleteUser(id).then(data => {
			if (data.status === 200) {
				this.onFetchCustomer();
			}
		});
	}

	onFetchCustomer() {
		findAllCustomer().then(data => {
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
				<h4 className='display-5 table-title'>Customers</h4>
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
										<EditEntryButton
											history={this.props.history}
											redirectUrl={'/admin/customers/edit/' + value.id}
										/>
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

AdminCustomersPage.propTypes = {
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
	authenticateUser,
	logoutUser,
	showAlert
})(AdminCustomersPage);
