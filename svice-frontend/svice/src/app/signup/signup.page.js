import React from "react";
// reactstrap components
import {
  Container,
  UncontrolledAlert,
  Row
} from "reactstrap";

import { SignUpForm } from "./form";
import { Register } from "./signup.service";
import "./signup.css";

export class SignUpPage extends React.Component {

  constructor(props) {
    super(props);
    this.formData = {};
    this.state = {
      loading: false,
      success: false,
      errors: {}
    }
  }

  onSubmit = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    Register(this.formData)
      .then(data => 
        this.setState({ 
          success: true,
          loading: false 
      }));
  }

  onInputChange = (name, value) => {
    this.formData[name] = value;
  }

  render () {
    const fields = [
      {required: true, name: "first_name", type: "text", placeholder: "First Name"},
      {required: true, name: "last_name", type: "text", placeholder: "Last Name"},
      {required: true, name: "email", type: "email", placeholder: "Email"},
      {required: true, name: "password", type: "password", placeholder: "Password"},
      {required: true, name: "password_confirmation", type: "password", placeholder: "Password Confirmation"}
    ]
    return (
        <div className="section section-signup signup-background">
          <Container>
            <UncontrolledAlert color="info" isOpen={this.state.success}>
              <b>Success!</b> You have created an account.
            </UncontrolledAlert>
            <Row>
              <SignUpForm
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
