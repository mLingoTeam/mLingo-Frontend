import React from "react";
import View from './FormpageRegisterView'

import { authentication_service } from '../../../../../services/authentication/authentication'

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


    this.account_login = this.account_login.bind(this);
    this.account_register = this.account_register.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }


  ////////////////////////////////////////////////////
  async  account_register() {
    const req = await authentication_service.register(
      this.state.username,
      this.state.email,
      this.state.password
    );

    this.sendLoginRequest();
}
  ////////////////////////////////////////////////////

  render() {
    return <View that={this.state} />
  }
}

export default Register;
