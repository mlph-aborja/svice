import React, { Component } from 'react';
import { connect } from 'react-redux';
import { authenticateUser, logoutUser } from '../../../../actions/auth.action';
import PropTypes from 'prop-types';

class AdminAdminsPage extends Component {
	render() {
		return (
			<div>
				<br>
				</br>
				<br>
				</br>
				<br>
				</br>
				<h1>Admins PAGE</h1>
			</div>
		);
	}
}

AdminAdminsPage.propTypes = {
	logoutUser: PropTypes.func.isRequired,
	authenticated_user: PropTypes.object.isRequired,
	access_token: PropTypes.string.isRequired,
	isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
	authenticated_user: state.auth.authenticated_user,
	access_token: state.auth.access_token,
	isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { authenticateUser, logoutUser })(
	AdminAdminsPage
);
