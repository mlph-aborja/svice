import React from 'react';
import { Button } from 'reactstrap';

const EditEntryButton = props => {
	const onRedirectTo = () => {
		props.history.push(props.redirectUrl);
	};

	return (
		<Button color='info' onClick={onRedirectTo}>
			<i className='fas fa-edit'></i>
		</Button>
	);
};

export default EditEntryButton;
