import React, { Component } from 'react';
import { connect } from 'react-redux';
import { authenticateUser, logoutUser } from '../../../../actions/auth.action';
import PropTypes from 'prop-types';
import { Container, Button , Jumbotron} from 'reactstrap';

class AdminAdminsPage extends Component {
	render() {
		return (
			<div>
				<Jumbotron>
					<Container>
					<h1 className="display-3">Hello, world!</h1>
					<p className="lead">This is a simple hero unit, a simple Jumbotron-style component for calling extra attention to featured content or information.</p>
					<hr className="my-2" />
					<p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
					<p className="lead">
					<Button color="primary">Learn More</Button>
					</p>
					</Container>
					
				</Jumbotron>
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
