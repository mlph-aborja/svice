import React from 'react';
import { Button } from 'reactstrap';

const AddEntryButton = props => {
	const onRedirectTo = () => {
		props.history.push(props.redirectUrl);
	};

	return (
		<Button color='success' className='pull-right' onClick={onRedirectTo}>
			<i className='now-ui-icons ui-1_simple-add'></i>
		</Button>
	);
};

export default AddEntryButton;
