import React from 'react';

// reactstrap components
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
  Container,
  Col,
  UncontrolledAlert,
  Row
} from 'reactstrap';

// core components
import AppNavbar from './../../../components/navbars/AppNavbar.js';
import TransparentFooter from './../../../components/footers/TransparentFooter.js';
import { LoginForm } from './form';
import { Login } from './login.service';
import './login.css';

export class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.formData = {};
    this.state = {
      ...props,
      errors: [],
      success: false,
      alert: false
    };

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
      { required: true, name: 'email', type: 'email', placeholder: 'Email' },
      {
        required: true,
        name: 'password',
        type: 'password',
        placeholder: 'Password'
      }
    ];

    return (
      // <div className="section section-signup signup-background">
      //   <Container>
      //     <UncontrolledAlert
      //       color={this.state.success ? 'info' : 'danger'}
      //       isOpen={this.state.alert}
      //     >
      //       {this.state.message}
      //     </UncontrolledAlert>
      //     <Row>
      //       <LoginForm
      //         fields={fields}
      //         errors={this.state.errors}
      //         title={process.env.REACT_APP_TITLE}
      //         onSubmit={this.onSubmit}
      //         onInputChange={this.onInputChange}
      //       />
      //     </Row>
      //   </Container>
      // </div>
      <React.Fragment>
        <div className="page-header clear-filter" filter-color="blue">
          <div
            className="page-header-image"
            style={{
              backgroundImage: 'url(' + require('assets/img/login.jpg') + ')'
            }}
          ></div>
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
