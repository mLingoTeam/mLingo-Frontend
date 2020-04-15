import React from "react";
import { Form } from "reactstrap";
import Form_Input from "../FormInput/FormInput";
import { Link } from 'react-router-dom'
import { FaGoogle, FaFacebook } from 'react-icons/fa';

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      password: "",
      isLoading: false
    };

    this.fields = [
      {
        type: "text",
        name: "username",
        label: "username",
        function: this.handleChange.bind(this),
        placeholder: "Jake the dog",
        id: "Username"
      },
      {
        type: "email",
        name: "email",
        label: "email",
        function: this.handleChange.bind(this),
        placeholder: "Jake@dogmail.com",
        id: "Email"
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
    this.account_register = this.account_helpers.account_register.bind(this);
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
              this.register_account();
              e.preventDefault();
            }}
          >
            <h1 className="col-12 mb-5">sign up</h1>
            {this.fields.map(element => (
              <Form_Input set={element} />
            ))}

            <button className="col-12 offset-lg-4 col-lg-4 btn green-button registerbutton">
              get started
            </button>
            <div className="col-12">
              <button className="col-12 fbconnect"><FaFacebook /> Sign in with Facebook</button>
              <button className="col-12 ggconnect"><FaGoogle /> Sign in with Google</button>
            </div>
            <div className="col-12 alreadyaccount">
              <p>Already have an account? &nbsp; </p><Link to='/login'>sign in</Link>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

export default Register;
