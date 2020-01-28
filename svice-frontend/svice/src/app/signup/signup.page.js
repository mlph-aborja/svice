import React from "react";
// reactstrap components
import {
  Container,
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
      isLoading: false
    }
  }

  onSubmit = (event) => {
    event.preventDefault();
    this.setState({ isLoading: true });
    Register(this.formData)
      .then(data => 
        this.setState({ 
          isLoading: false 
      }));
  }

  onInputChange = (name, value) => {
    this.formData[name] = value;
  }

  render () {

    const fields = [
      {name: "first_name", type: "text", placeholder: "First Name", icon: "users_circle-08"},
      {name: "last_name", type: "text", placeholder: "Last Name", icon: "text_caps-small"},
      {name: "email", type: "email", placeholder: "Email", icon: "ui-1_email-85"},
      {name: "password", type: "text", placeholder: "Password", icon: "ui-1_email-85"},
      {name: "password_confirmation", type: "text", placeholder: "Password Confirmation", icon: "ui-1_email-85"}
    ]

    return (
        <div className="section section-signup signup-background">
          <Container>
            <Row>
              <SignUpForm 
                fields={fields}
                title={process.env.REACT_APP_TITLE} 
                onSubmit={this.onSubmit}
                onInputChange={this.onInputChange} />
            </Row>
          </Container>
        </div>    
    );
  }
}
