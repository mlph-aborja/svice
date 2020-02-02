import React from "react";
// reactstrap components
import {
  Container,
  UncontrolledAlert,
  Row
} from "reactstrap";

import { LoginForm } from "./form";
import { Login } from "./login.service";
import "./login.css";

export class LoginPage extends React.Component {

  constructor(props) {
    super(props);
    this.formData = {};
    this.state = {
      ...props,
      errors: [],
      success: false,
      alert: false
    }
  }

  onSubmit = (event) => {
    event.preventDefault();
    this.setState({ 
      loading: true 
    });
    Login(this.formData)
      .then(data => {
        if (data.message) {
          this.setState({
              alert: true,
              success: false,
              loading: false,
              message: data.message,
              errors: data.errors || {}
          })
        } else {
          this.setState({
              alert: true,
              success: true,
              loading: false,
              message: "Success Login",
              errors: []
          })
          // What to do with the user object?
          // const user = data.user;
        }
      })

  }

  onInputChange = (name, value) => {
    this.formData[name] = value;
  }

  render () {
    const fields = [
      {required: true, name: "email", type: "email", placeholder: "Email"},
      {required: true, name: "password", type: "password", placeholder: "Password"},
    ]
    return (
        <div className="section section-signup signup-background">
          <Container>
            <UncontrolledAlert 
              color={this.state.success ? 'info': 'danger'} 
              isOpen={this.state.alert}>
                {this.state.message}
            </UncontrolledAlert>
            <Row>
              <LoginForm
                fields={fields}
                errors={this.state.errors}
                title={process.env.REACT_APP_TITLE}
                onSubmit={this.onSubmit}
                onInputChange={this.onInputChange} />
            </Row>
          </Container>
        </div>
    );
  }
}
