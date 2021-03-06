import React from "react";
import { withRouter } from 'react-router-dom';
import View from './FormpageLoginView'

import { authentication_service } from '../../../../../services/authentication/authentication'
import handleResponse from '../../../../../services/handleResponse';

import { CURRENT_LOGGED_USER } from '../../../../../config/constants/localStorageConstants';

class FormpageLoginContainer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      password: "",
      isLoading: false,
      err: false,
      hidden: true,
      fields: [
        {
          type: "text",
          name: "username",
          label: "username/email",
          function: this.handleChange.bind(this),
          placeholder: "Jake the dog",
          id: "Username"
        },
        {
          type: this.isHidden(),
          name: "password",
          label: "password",
          function: this.handleChange.bind(this),
          placeholder: "admin",
          id: "Password"
        }
      ]
    };



    this.handleChange = this.handleChange.bind(this);
    this.account_login = this.account_login.bind(this);
    this.isHidden = this.isHidden.bind(this);


    this.functions = {
      account_login: this.account_login,
      handleChange: this.handleChange
    }
  }

  isHidden() {
    if (this.state) {
      if (this.state.hidden) {
        return "password"
      }
      return "text"
    }
    return "password"
  }


  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /////////////////////////////////////////
  async account_login() {


    this.setState({
      ...this.state,
      isLoading: true
    })


    handleResponse({ request: authentication_service.user.login(this.state.username, this.state.password), error_message: 'ooops something went wrong...' })
      .then(resolved => {
        console.log(resolved)
        console.log(resolved.response)
        if (resolved.statusCode === 200) {
          localStorage.setItem(CURRENT_LOGGED_USER, resolved.response.username);
          localStorage.setItem("ID", resolved.response.id);
          localStorage.setItem("Token", resolved.response.token);
        }
        this.setState({
          ...this.state,
          isLoading: false
        })
      })

  }
  /////////////////////////////////////////


  render() {
    if (localStorage.getItem(CURRENT_LOGGED_USER)) {
      this.props.history.push('/head');
    }

    return <View state={this.state} fields={this.state.fields} functions={this.functions} />
  }
}

export default withRouter(FormpageLoginContainer);
