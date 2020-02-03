import React from 'react';
// reactstrap components
import { Container, Col, Alert } from 'reactstrap';

import { SignUpForm } from './form';
import { Register } from './signup.service';
import './signup.css';

export class CustomerSignUpPage extends React.Component {
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
    Register(this.formData).then(data => {
      if (data.errors) {
        this.setState({
          alert: true,
          success: false,
          loading: false,
          message: data.message,
          errors: data.errors
        });
      } else {
        this.setState({
          alert: true,
          success: true,
          loading: false,
          message: 'Success Sign Up',
          errors: []
        });

        this.props.history.push('/login?success=true');
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
        name: 'first_name',
        type: 'text',
        placeholder: 'First Name',
        icon: 'users_circle-08'
      },
      {
        required: true,
        name: 'last_name',
        type: 'text',
        placeholder: 'Last Name',
        icon: 'users_circle-08'
      },
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
      },
      {
        required: true,
        name: 'password_confirmation',
        type: 'password',
        placeholder: 'Password Confirmation',
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
            color={this.state.success ? 'success' : 'danger'}
            isOpen={this.state.alert}
          >
            {this.state.message}
          </Alert>
          <div className="content">
            <Container>
              <Col className="ml-auto mr-auto" md="4">
                <SignUpForm
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
