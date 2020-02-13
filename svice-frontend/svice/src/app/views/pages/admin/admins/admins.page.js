import React, { Component } from 'react';
import { connect } from 'react-redux';
import { authenticateUser, logoutUser } from '../../../../actions/auth.action';
import PropTypes from 'prop-types';
import { Container, Button , Table} from 'reactstrap';
import { findAllAdmin } from '../../../../services/user.service';
import { showAlert } from '../../../../actions/alert-box.action';

class AdminAdminsPage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			...props,
			datas: []
		};
	}

	componentDidMount() {
		findAllAdmin().then(data => {
			if (data.message) {
				// Show Alert
				this.props.showAlert(true, false, data.message);
			} else {
				this.setState({
					datas: data.data.users || []
				});
			}
		});
	}

	onRedirectTo(redirectUrl) {
		this.props.history.push(redirectUrl);
	}
	
	render() {
		return (
					<Container>
						<h4 className="display-5 table-title">Admins</h4>
						<Button 
							color="success" 
							className="pull-right"
							onClick={() => this.onRedirectTo('/admin/admins/add')}><i className='now-ui-icons ui-1_simple-add'></i></Button>
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
							{this.state.datas.map((value, index) => {
								return <tr key={index}>
								<td>{value.first_name}</td>
								<td>{value.last_name}</td>
								<td>{value.email}</td>
								<td>
									<Button color="danger"><i className='now-ui-icons shopping_basket'></i></Button>
									<Button color="info"><i className='now-ui-icons text_align-center'></i></Button>
								</td>	
								</tr>
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

export default connect(mapStateToProps, { showAlert, authenticateUser, logoutUser })(
	AdminAdminsPage
);
