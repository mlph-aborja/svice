import React from 'react';

import {
	Button,
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Form,
	Input,
	FormGroup,
	FormText,
	InputGroupAddon,
	InputGroupText,
	InputGroup,
	Spinner,
	ButtonToolbar
} from 'reactstrap';

import { Link } from 'react-router-dom';
import './signup.form.css';

export class SignUpForm extends React.Component {
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
					<CardHeader className='text-center'>
						<h1>
							<i className='now-ui-icons ui-2_settings-90 mr-2'></i>
							SVICE
						</h1>
						<h3>Registration</h3>
					</CardHeader>
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
						<ButtonToolbar>
							<Button
								className='btn-round'
								color='info'
								onClick={e => this.props.onSubmit(e)}
								size='lg'
								block
							>
								{this.showSpinner()}
								Register Account
							</Button>
						</ButtonToolbar>
						<div className='pull-right'>
							<h6>
								<Link className='link' to={'/login'}>
									Login your Account
								</Link>
							</h6>
						</div>
					</CardFooter>
				</Form>
			</Card>
		);
	}
}
