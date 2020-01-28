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
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup
} from "reactstrap";

export function SignUpForm (props) {
  return (
    <Card className="card-signup" >
      <Form action="" className="form" method="">
        <CardHeader className="text-center">
          <CardTitle className="title-up" tag="h3">
           {props.title} Sign Up 
          </CardTitle>
        </CardHeader>
        <CardBody>
          { props.fields.map((field, index) => {
            return <InputGroup key={index} className={ "no-border" }>
              <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className={[field.icon, "now-ui-icons"].join(' ')}></i>
                  </InputGroupText> 
                </InputGroupAddon>
                <Input
                  placeholder={field.placeholder}
                  name={field.name}
                  type={field.type}
                  onChange={event => props.onInputChange(field.name, event.target.value)}
                ></Input>
             </InputGroup>
          })}
        </CardBody>
        <CardFooter className="text-center">
          <Button
            className="btn-primary btn-round"
            color="info"
            onClick={e => props.onSubmit(e) }
            size="lg"
          >
            SUBMIT
          </Button>
        </CardFooter>
      </Form>      
    </Card>
  );
}
