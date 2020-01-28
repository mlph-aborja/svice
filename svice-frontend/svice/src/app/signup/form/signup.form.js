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
  Input,
} from "reactstrap";


export class SignUpForm extends React.Component {


  constructor (props) {
    super(props);
    this.state = {}
  }

  onBlur = (field, value) => {

    var error = false;
    if (field.required) {

    }

    this.setState({
      [field.name]: true
    })



  }

  render () {
    return (
      <Card className="card-signup" >
        <Form action="" className="form" method="">
          <CardHeader className="text-center">
            <CardTitle className="title-up" tag="h3">
             {this.props.title} Sign Up
            </CardTitle>
          </CardHeader>
          <CardBody>
            { this.props.fields.map((field, index) => {
              return <FormGroup key={index} className={"no-border " + (this.state[field.name] ? 'has-danger' : '')}>
                <Input
                  name={field.name}
                  placeholder={field.placeholder}
                  type={field.type}
                  onChange={event => this.props.onInputChange(field.name, event.target.value)}
                  onBlur={event => this.onBlur(field, event.target.value)}
                ></Input>
              </FormGroup>
            })}
          </CardBody>
          <CardFooter className="text-center">
            <Button
              className="btn-primary btn-round"
              color="info"
              onClick={e => this.props.onSubmit(e) }
              size="lg">
              SUBMIT
            </Button>
          </CardFooter>
        </Form>
      </Card>
    );
  }
}