import React from 'react';
import { connect } from 'react-redux';
import { authenticateUser, logoutUser } from '../../../actions/auth.action';
import PropTypes from 'prop-types';
import AuthUtil from '../../../util/auth.util';
import { Button, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './logout.css';

class LogoutButton extends React.Component {
	onLogout = () => {
		this.props.logoutUser();
		AuthUtil.destroyAuthenticatedUser();
	};
	render() {
		return (
			<NavLink className='navbar-text' 
				to={this.props.redirectUrl} 
				onClick={this.onLogout} 
				tag={Link}>
				LOGOUT
			</NavLink>
		);
	}
}

LogoutButton.propTypes = {
	authenticateUser: PropTypes.func.isRequired,
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
	LogoutButton
);
