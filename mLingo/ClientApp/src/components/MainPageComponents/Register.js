import React from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import img1 from "../../img/monkey.png";

const Register = props => {
  return (
    <div>
      <div className="registerForm2 col-12 d-flex jusify-content-center flex-wrap">
        <img src={img1} className="img-fluid offset-5 col-2" alt="logo" />
        <h1 className="text-center col-12 mb-5">Join us now!</h1>
        <Form className="col-12 offset-md-4 col-md-6">
          <FormGroup className="col-12 mb-5">
            <Label for="Email2" className="col-2">
              Email
            </Label>
            <Input
              className="col-12 col-md-8"
              type="email"
              name="email"
              id="Email2"
              placeholder="email@gmail.com"
            />
          </FormGroup>
          <FormGroup className="col-12 mb-5">
            <Label for="Password2" className="col-2">
              Password
            </Label>
            <Input
              className="col-12 col-md-8"
              type="password"
              name="password"
              id="Password2"
              placeholder="Password"
            />
          </FormGroup>
          <Button className="col-12 offset-md-2 col-md-4 btn-success">
            JOIN
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Register;
