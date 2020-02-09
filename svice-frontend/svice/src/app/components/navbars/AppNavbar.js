import React from 'react';
import { Link } from 'react-router-dom';
import { authenticateUser, logoutUser } from '../../actions/auth.action';
// reactstrap components
import {
	Collapse,
	NavbarBrand,
	Navbar,
	NavItem,
	Nav,
	Container,
	UncontrolledTooltip
} from 'reactstrap';

import LogoutButton from '../buttons/logout/logout';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const AppNavbar = props => {
	const [navbarColor, setNavbarColor] = React.useState('"bg-info');
	const [collapseOpen, setCollapseOpen] = React.useState(false);

	React.useEffect(() => {
		const updateNavbarColor = () => {
			if (
				document.documentElement.scrollTop > 399 ||
				document.body.scrollTop > 399
			) {
				setNavbarColor('');
			} else if (
				document.documentElement.scrollTop < 400 ||
				document.body.scrollTop < 400
			) {
				setNavbarColor('navbar-transparent');
			}
		};
		window.addEventListener('scroll', updateNavbarColor);
		return function cleanup() {
			window.removeEventListener('scroll', updateNavbarColor);
		};
	});

	const show = () => {
		if (props.isAuthenticated) {
			return (
				<>
					{collapseOpen ? (
						<div
							id='bodyClick'
							onClick={() => {
								document.documentElement.classList.toggle('nav-open');
								setCollapseOpen(false);
							}}
						/>
					) : null}
					<Navbar
						className={'fixed-top ' + navbarColor}
						color='info'
						expand='lg'
					>
						<Container>
							<div className='navbar-translate'>
								<NavbarBrand to='/admin/profile' tag={Link} id='navbar-brand'>
									<i className='now-ui-icons ui-2_settings-90 mr-2'></i> Svice
								</NavbarBrand>
								<UncontrolledTooltip target='#navbar-brand'>
									Svice Home
								</UncontrolledTooltip>
								<button
									className='navbar-toggler navbar-toggler'
									onClick={() => {
										document.documentElement.classList.toggle('nav-open');
										setCollapseOpen(!collapseOpen);
									}}
									aria-expanded={collapseOpen}
									type='button'
								>
									<span className='navbar-toggler-bar top-bar'></span>
									<span className='navbar-toggler-bar middle-bar'></span>
									<span className='navbar-toggler-bar bottom-bar'></span>
								</button>
							</div>
							<Collapse
								className='justify-content-end'
								isOpen={collapseOpen}
								navbar
							>
								<Nav navbar>
									{/* <NavItem>
								<NavLink to='/index' tag={Link}>
									Back to Kit
								</NavLink>
							</NavItem> */}
									<NavItem>
										<LogoutButton
											redirectUrl='/admin/login'
											history={props.history}
										/>
									</NavItem>
								</Nav>
							</Collapse>
						</Container>
					</Navbar>
				</>
			);
		}
	};

	return <React.Fragment>{show()}</React.Fragment>;
};

AppNavbar.propTypes = {
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
	AppNavbar
);
