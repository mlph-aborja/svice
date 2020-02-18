import React, { Component } from 'react';

import {
	Button,
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Form,
	Input,
	InputGroupAddon,
	InputGroupText,
	InputGroup,
	FormGroup,
	FormText,
	ButtonToolbar,
	Spinner
} from 'reactstrap';

class AddUpdateForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			...props
		};
	}

	validate = (field, value) => {
		var style = '';
		if (field.required) {
			if (value.trim() === '') {
				style = 'has-danger';
			} else {
				// TODO: check others eg email, password, password_confirmation
				style = 'has-success';
				const errors = this.state.errors;
				errors[field.name] = [];
				this.setState({
					errors: errors
				});
			}
		} else {
			// TODO:
		}
		this.setState({
			[field.name]: style
		});
	};

	static getDerivedStateFromProps(nextProps, prevState) {
		return {
			errors: nextProps.errors
		};
	}

	showSpinner = () => {
		if (this.props.loading) {
			return (
				<Spinner
					className='loader-spinner'
					as='span'
					size='sm'
					aria-hidden='true'
				/>
			);
		}
	};

	render() {
		return (
			<Card className='card-login card-plain'>
				<Form action='' className='form' method=''>
					<CardBody>
						{this.props.fields.map((field, index) => {
							return (
								<FormGroup
									key={index}
									className={'no-border ' + this.state[field.name]}
								>
									<InputGroup className='m-0'>
										<InputGroupAddon addonType='prepend'>
											<InputGroupText>
												<i className={'now-ui-icons mr-2 ' + field.icon}></i>
											</InputGroupText>
										</InputGroupAddon>
										<Input
											name={field.name}
											placeholder={field.placeholder}
											value={field.value}
											type={field.type}
											onChange={event =>
												this.props.onInputChange(field.name, event.target.value)
											}
											onBlur={event => this.validate(field, event.target.value)}
										></Input>
									</InputGroup>
									<FormText className='text-center text-danger error-text'>
										{this.state.errors[field.name]}
									</FormText>
								</FormGroup>
							);
						})}
					</CardBody>
					<CardFooter className='text-center'>
						<ButtonToolbar></ButtonToolbar>
						<Button
							block
							className='btn-round'
							color='info'
							onClick={e => this.props.onSubmit(e)}
							size='lg'
						>
							{this.showSpinner()}
							Save
						</Button>
					</CardFooter>
				</Form>
			</Card>
		);
	}
}

export default AddUpdateForm;
