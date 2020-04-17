import React from "react";
import { withRouter } from 'react-router-dom';
import View from './FormpageLoginView'

import { authentication_service } from '../../../../../services/authentication/authentication'
import handleResponse from '../../../../../services/handleResponse';

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

    this.functions = {
      account_login: this.account_login,
      handleChange: this.handleChange
    }
  }


  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /////////////////////////////////////////
  async account_login() {

    const resolved = await handleResponse( { request: authentication_service.user.login({username: this.state.username, password: this.state.password}), error_message: 'ooops something went wrong...' } )

    if( resolved !== false){

      localStorage.setItem("currentUser", resolved.response.username);
      localStorage.setItem("ID", resolved.response.id);
      localStorage.setItem("Token", resolved.response.token);


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


}
  /////////////////////////////////////////


  render() {
    if (localStorage.getItem("currentUser")) {
      this.props.history.push('/head');
    }

    return  <View state={this.state} fields={this.fields} functions={this.functions}/>
  }
}

export default withRouter(FormpageLoginContainer);
