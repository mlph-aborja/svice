import React, { Component } from 'react';

import { connect } from 'react-redux';
import { showAlert } from '../../../actions/alert.action';
import PropTypes from 'prop-types';
import { Alert } from 'reactstrap';
import './alert.css';

class AlertDialog extends Component {
	show = () => {
		if (this.props.alert) {
			return (
				<Alert
					className='alert-dialog'
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

AlertDialog.protoTypes = {
	showAlert: PropTypes.func.isRequired,
	alert: PropTypes.bool.isRequired,
	success: PropTypes.bool.isRequired,
	message: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
	alert: state.alert.show,
	success: state.alert.success,
	message: state.alert.message
});

export default connect(mapStateToProps, { showAlert })(AlertDialog);
