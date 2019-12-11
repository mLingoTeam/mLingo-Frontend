import React from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";
import img1 from "../../img/monkey.png";

import { authenticationService } from "../../services/authentication";

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      password: ""
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ name: event.target.value });
  }

  render() {
    return (
      <div>
        <div className="registerForm2 col-12 d-flex jusify-content-center flex-wrap">
          <img src={img1} className="img-fluid offset-5 col-2" alt="logo" />
          <h1 className="text-center col-12 mb-5">Join us now!</h1>
          <Form
            className="col-12 offset-lg-4 col-lg-6"
            onSubmit={e => {
              localStorage.setItem("currentUser", this.state.username);
              authenticationService.register(
                this.state.username,
                this.state.email,
                this.state.password
              );
              e.preventDefault();
            }}
          >
            <FormGroup className="col-12 mb-5">
              <Label for="Username2" className="col-2">
                Username
              </Label>
              <Input
                className="col-12 col-lg-8"
                type="text"
                name="username"
                id="Username2"
                placeholder="Zbyszko z Bogdanca"
                required
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup className="col-12 mb-5">
              <Label for="Email2" className="col-2">
                Email
              </Label>
              <Input
                className="col-12 col-lg-8"
                type="email"
                name="email"
                id="Email2"
                placeholder="email@gmail.com"
                required
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup className="col-12 mb-5">
              <Label for="Password2" className="col-2">
                Password
              </Label>
              <Input
                className="col-12 col-lg-8"
                type="password"
                name="password"
                id="Password2"
                placeholder="Password"
                required
                onChange={this.handleChange}
              />
            </FormGroup>
            <button className="col-12 offset-lg-2 col-lg-4 btn blue-button">
              JOIN
            </button>
          </Form>
        </div>
      </div>
    );
  }
}

export default Register;
