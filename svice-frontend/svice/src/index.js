/*

=========================================================
* Now UI Kit React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/now-ui-kit-react
* Copyright 2019 Creative Tim (http://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/now-ui-kit-react/blob/master/LICENSE.md)

* Designed by www.invisionapp.com Coded by www.creative-tim.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from 'react';
import ReactDOM from 'react-dom';

// pages for this kit
import App from 'app';
import { Provider } from 'react-redux';
import store from './store';
import AuthUtil from './app/util/auth.util';
import { AUTHENTICATE_USER } from './app/actions/types';

if (AuthUtil.getAuthenticatedUser() && AuthUtil.getAccessToken()) {
	store.dispatch({
		type: AUTHENTICATE_USER,
		payload: {
			authenticated_user: AuthUtil.getAuthenticatedUser(),
			access_token: AuthUtil.getAccessToken(),
			roles: AuthUtil.getAuthenticatedUserRoles()
		}
	});
}

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);
