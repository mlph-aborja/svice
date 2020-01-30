import React from "react";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Form,
  FormGroup,
  FormText,
  Input,
} from "reactstrap";


export class LoginForm extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      ...props
    }
  }

  validate = (field, value) => {
    var style = '';
    if (field.required) {
      if (value.trim() === "") {
        style = 'has-danger';
      } else {
        // TODO: check others eg email, password, password_confirmation
        style = 'has-success';
        const errors = this.state.errors;
        errors[field.name] = [];
        this.setState({
          errors: errors
        })
      }
    } else {
      // TODO:
    }
    this.setState({
      [field.name]: style
    })
  }

  static getDerivedStateFromProps(nextProps, prevState) {
   return {
    errors: nextProps.errors,
   };
  }

  render () {
    return (
      <Card className="card-signup">
        <Form action="" className="form" method="">
          <CardHeader className="text-center">
            <CardTitle className="title-up" tag="h3">
             {this.props.title} Login
            </CardTitle>
          </CardHeader>
          <CardBody>
            { this.props.fields.map((field, index) => {
              return <FormGroup key={index} className={"no-border " + (this.state[field.name])}>
                <Input
                  name={field.name}
                  placeholder={field.placeholder}
                  type={field.type}
                  onChange={event => this.props.onInputChange(field.name, event.target.value)}
                  onBlur={event => this.validate(field, event.target.value)}
                ></Input>
                 <FormText className="text-muted text-center" color="danger">
                  {this.state.errors[field.name]}
                </FormText>
              </FormGroup>
            })}
          </CardBody>
          <CardFooter className="text-center">
            <Button
              className="btn-primary btn-round"
              href="#"
              onClick={e => this.props.onSubmit(e) }
              size="lg">
              LOGIN
            </Button>
          </CardFooter>
        </Form>
      </Card>
    );
  }
}