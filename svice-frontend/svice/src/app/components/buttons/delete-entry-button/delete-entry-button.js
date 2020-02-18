import React from 'react';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const DeleteEntryButton = props => {
	const onDelete = () => {
		props.onClick();
	};

	const display = () => {
		if (props.authenticated_user.id !== props.userId) {
			return (
				<Button color='danger' onClick={onDelete}>
					<i className='now-ui-icons shopping_basket'></i>
				</Button>
			);
		} else {
			return null;
		}
	};

	return <>{display()}</>;
};

DeleteEntryButton.propTypes = {
	authenticated_user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	authenticated_user: state.auth.authenticated_user
});

export default connect(mapStateToProps, {})(DeleteEntryButton);
