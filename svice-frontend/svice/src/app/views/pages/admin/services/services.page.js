import React, { Component } from 'react';
import { connect } from 'react-redux';
import { authenticateUser, logoutUser } from '../../../../actions/auth.action';
import PropTypes from 'prop-types';
import {
	deleteService,
	findAllService
} from '../../../../services/service.service';
import { Container, Table } from 'reactstrap';
import { showAlert } from '../../../../actions/alert-box.action';
import AddEntryButton from '../../../../components/buttons/add-entry-button/add-entry-button';
import DeleteEntryButton from '../../../../components/buttons/delete-entry-button/delete-entry-button';
import EditEntryButton from '../../../../components/buttons/edit-entry-button/edit-entry-button';

class AdminServicesPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			...props,
			data: []
		};
	}

	componentDidMount() {
		this.onFetchService();
	}

	onDelete(id) {
		deleteService(id).then(data => {
			if (data.status === 200) {
				this.onFetchService();
			}
		});
	}

	onFetchService() {
		findAllService().then(data => {
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
				<h4 className='display-5 table-title'>Services</h4>
				<AddEntryButton
					history={this.props.history}
					redirectUrl='/admin/admins/add'
				/>
				<Table>
					<thead>
						<tr>
							<th>Name</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{this.state.data.map((value, index) => {
							return (
								<tr key={index}>
									<td>{value.name}</td>
									<td>
										<DeleteEntryButton
											userId={value.id}
											onClick={() => this.onDelete(value.id)}
										/>
										<EditEntryButton
											history={this.props.history}
											redirectUrl={'/admin/admins/edit/' + value.id}
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

AdminServicesPage.propTypes = {
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
	authenticated_user: state.auth.authenticated_user,
	access_token: state.auth.access_token,
	isAuthenticated: state.auth.isAuthenticated,

	authenticated_user: state.auth.authenticated_user,
	access_token: state.auth.access_token,
	isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {
	authenticateUser,
	logoutUser,
	showAlert
})(AdminServicesPage);
