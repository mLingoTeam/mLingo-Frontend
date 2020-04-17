import React from "react";
import { withRouter } from 'react-router-dom';
import View from './FormpageRegisterView'

import { authentication_service } from '../../../../../services/authentication/authentication'

class FormpageRegisterContainer extends React.Component {
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

    /////////////////////////////////////////
    async account_login() {
      const resolved = await authentication_service.user.login({username: this.state.username, password: this.state.password});

      //if there is not such an user
      const resstatus = (JSON.stringify(resolved.successful));

      if (resstatus == 'false') {
        const err = (JSON.stringify(resolved.errorMessage));
        this.setState({ ...this.state, err: err })

      } // if the user exist save they into the web
      else {
        authentication_service.setIntoLocalStorage({ name: "currentUser", value: resolved.response.username });
        authentication_service.setIntoLocalStorage({ name: "ID", value: resolved.response.id });
        authentication_service.setIntoLocalStorage({ name: "Token", value: resolved.response.token });
      }

      // TO RERENDER WHEN THE ITEM IS SET IN THE LOCALSTORAGE
      this.setState({
        ...this.state,
        isLoading: true
      })
      setTimeout(() => {
        this.setState({
          ...this.state,
          isLoading: false
        })
      }, 1000);

  }
    /////////////////////////////////////////

  render() {
    if (localStorage.getItem("currentUser")) {
      this.props.history.push('/head');
    }
    return <View state={this.state} fields={this.fields}/>
  }
}

export default withRouter(FormpageRegisterContainer);
