import React from "react";
import View from './FormpageLoginView'

import { authentication_service } from '../../../../../services/authentication/authentication'

class FormpageLoginContainer extends React.Component {

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

    this.account_login = this.account_login.bind(this);
  }


  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

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
    return  <View that={this.state}/>
  }
}

export default FormpageLoginContainer;
