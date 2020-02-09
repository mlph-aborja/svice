import AuthUtil from '../util/auth.util';

const authGuard = (to, from, next) => {
	if (AuthUtil.isAuthenticated()) {
		next();
	}

	next.redirect('/login');
};

export default authGuard;
