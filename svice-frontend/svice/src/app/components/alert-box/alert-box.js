import React, { Component } from 'react';

import { connect } from 'react-redux';
import { showAlert } from '../../../actions/alert-box.action';
import PropTypes from 'prop-types';
import { Alert } from 'reactstrap';
import './alert-box.css';

class AlertBox extends Component {
	show = () => {
		if (this.props.alert) {
			return (
				<Alert
					className='alert-box'
					isOpen={this.props.alert}
					color={this.props.success ? 'success' : 'danger'}
				>
					{this.props.message}
				</Alert>
			);
		}
	};

	render() {
		return <React.Fragment>{this.show()}</React.Fragment>;
	}
}

AlertBox.protoTypes = {
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
