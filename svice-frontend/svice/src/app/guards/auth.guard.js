import AuthUtil from '../util/auth.util';
import queryString from 'query-string';

const authGuard = (to, from, next) => {
	const roles = AuthUtil.getAuthenticatedUserRoles();
	const url = queryString.parseUrl(to.location.pathname).url;
	const adminString = url.split('/')[1];

	const isAdmin = () => {
		return roles.find(role => role === 'ADMIN');
	};

	const isCustomer = () => {
		return roles.find(role => role === 'CUSTOMER');
	};

	if (AuthUtil.isAuthenticated()) {
		if (url === '/admin/login') {
			if (isAdmin()) {
				next.redirect('/admin/profile');
			} else {
				next.redirect('/');
			}
		} else if (url === '/login') {
			if (isAdmin()) {
				next.redirect('/admin/profile');
			} else {
				next.redirect('/');
			}
		} else {
			if (adminString === 'admin') {
				if (isCustomer()) {
					next.redirect('/');
				}

				if (isAdmin()) {
					next();
				}

				next.redirect('/login');
			}
			next();
		}
		next();
	} else {
		if (url === '/admin/login' || url === '/login' || url === '/signup') {
			next();
		} else {
			next.redirect('/login');
		}
	}
};

export default authGuard;
