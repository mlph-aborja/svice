import React from 'react';
import queryString from 'query-string';

// reactstrap components
import { Container, Col, Alert } from 'reactstrap';

// core components
import { LoginForm } from './form';
import { Login } from './login.service';
import './login.css';

export class AdminLoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.formData = {};
    this.state = {
      ...props,
      errors: [],
      success: false,
      alert: false
    };

    this.onInitPage();
  }

  onInitPage() {
    document.body.classList.add('login-page');
    document.body.classList.add('sidebar-collapse');
    document.documentElement.classList.remove('nav-open');
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  }

  onSubmit = event => {
    event.preventDefault();
    this.setState({
      loading: true
    });
    Login(this.formData).then(data => {
      if (data.message) {
        this.setState({
          alert: true,
          success: false,
          loading: false,
          message: data.message,
          errors: data.errors || {}
        });
      } else {
        this.setState({
          alert: true,
          success: true,
          loading: false,
          message: 'Success Login',
          errors: []
        });
        // What to do with the user object?
        // const user = data.user;
      }
    });
  };

  onInputChange = (name, value) => {
    this.formData[name] = value;
  };

  render() {
    const fields = [
      {
        required: true,
        name: 'email',
        type: 'email',
        placeholder: 'Email',
        icon: 'ui-1_email-85'
      },
      {
        required: true,
        name: 'password',
        type: 'password',
        placeholder: 'Password',
        icon: 'ui-1_lock-circle-open'
      }
    ];

    return (
      <React.Fragment>
        <div className="page-header clear-filter" filter-color="blue">
          <div
            className="page-header-image"
            style={{
              backgroundImage: 'url(' + require('assets/img/login.jpg') + ')'
            }}
          ></div>
          <Alert
            isOpen={this.state.alert}
            color={this.state.success ? 'success' : 'danger'}
          >
            {this.state.message}
          </Alert>
          <div className="content">
            <Container>
              <Col className="ml-auto mr-auto" md="4">
                <LoginForm
                  fields={fields}
                  errors={this.state.errors}
                  title={process.env.REACT_APP_TITLE}
                  onSubmit={this.onSubmit}
                  onInputChange={this.onInputChange}
                />
              </Col>
            </Container>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
