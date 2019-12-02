import React from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

const Formular = props => {
  return (
    <div className="registerForm d-none d-lg-block offset-3 col-lg-8">
      <Form inline className="col-12">
        <FormGroup className="col-4">
          <Label for="Username" className="text-white col-2">
            Username
          </Label>
          <Input
            className="offset-1 col-9"
            type="text"
            name="text"
            id="Username"
            placeholder="Zbyszko z Bogdanca"
            required
          />
        </FormGroup>
        <FormGroup className="col-4">
          <Label for="Email" className="text-white col-2">
            Email
          </Label>
          <Input
            className="offset-1 col-9"
            type="email"
            name="email"
            id="Email"
            placeholder="email@gmail.com"
          />
        </FormGroup>
        <FormGroup className="col-4">
          <Label for="Password" className="text-white col-2">
            Password
          </Label>
          <Input
            className="offset-1 col-9"
            type="password"
            name="password"
            id="Password"
            placeholder="Password"
          />
        </FormGroup>
        <Button className="col-3 btn-success">Register</Button>
      </Form>
    </div>
  );
};

export default Formular;
