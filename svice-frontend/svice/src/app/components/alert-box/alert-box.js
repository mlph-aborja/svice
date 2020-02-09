import React from 'react';

import { connect } from 'react-redux';
import { showAlert } from '../../actions/alert-box.action';
import PropTypes from 'prop-types';
import { Alert } from 'reactstrap';
import './alert-box.css';

const AlertBox = props => {
	const show = () => {
		if (props.alert) {
			return (
				<Alert
					className='alert-box'
					isOpen={props.alert}
					color={props.success ? 'success' : 'danger'}
				>
					{props.message}
				</Alert>
			);
		}
	};

	return <React.Fragment>{show()}</React.Fragment>;
};

AlertBox.propTypes = {
	showAlert: PropTypes.func.isRequired,
	alert: PropTypes.bool.isRequired,
	success: PropTypes.bool.isRequired,
	message: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
	alert: state.alertBox.show,
	success: state.alertBox.success,
	message: state.alertBox.message
});

export default connect(mapStateToProps, { showAlert })(AlertBox);
