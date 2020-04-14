import React from "react";
import { Form } from "reactstrap";
import { Link } from 'react-router-dom';

import Form_Input from "./Form_Input";

import {account_helpers} from './account_helpers'

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      password: "",
      isLoading: false,
      err: false
    };

    this.fields = [
      {
        type: "text",
        name: "username",
        label: "username/email",
        function: this.handleChange.bind(this),
        placeholder: "Jake the dog",
        id: "Username"
      },
      {
        type: "password",
        name: "password",
        label: "password",
        function: this.handleChange.bind(this),
        placeholder: "admin",
        id: "Password"
      }
    ];


    this.handleChange = this.handleChange.bind(this);

    this.account_login = this.account_helpers.account_login.bind(this);
  }


  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    return (
      <div>
        <div className="registerForm2 col-12 d-flex jusify-content-center flex-wrap">
          <Form
            className="col-12 offset-lg-3 col-lg-6"
            onSubmit={e => {
              e.preventDefault();
              this.account_login();
            }}
          >
            <h1 className="col-12 mb-5">sign in</h1>
            {this.fields.map(element => (
              <Form_Input set={element} />
            ))}

            {
              this.state.err != false ? <p>{this.state.err}</p> : null
            }

            <div className="col-12 remember">
              <span>
                <input type="checkbox" id="remember1" className="remembercheck" />
                <label for="remember1">remember me</label>
              </span>
              <Link to="/forgot">forgot password?</Link>
            </div>


            <button className="col-12 col-lg-4 btn green-button">
              get started
            </button>



            <div className="col-12 alreadyaccount">
              <p>Don't have an account? &nbsp; </p><Link to='/register'>sign up</Link>
            </div>
          </Form>
        </div>
      </div>
    );

  }
}

export default Login;
