import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

// styles for this kit
import '../assets/css/bootstrap.min.css';
import '../assets/scss/now-ui-kit.scss';
import '../assets/demo/demo.css';
import '../assets/demo/nucleo-icons-page-styles.css';

import { SignUpPage } from './pages/signup';
import { LoginPage } from './pages/login';

export default function App(props) {
  return (
    <BrowserRouter>
      <Switch>
        <Switch>
          <Route path="/signup" render={props => <SignUpPage {...props} />} />
          <Route path="/login" render={props => <LoginPage {...props} />} />
          <Redirect from="/" to="/signup" />
        </Switch>
      </Switch>
    </BrowserRouter>
  );
}
