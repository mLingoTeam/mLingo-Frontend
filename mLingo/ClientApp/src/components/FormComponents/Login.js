import React from "react";
import { Form } from "reactstrap";
import FormField from "./FormField";
import img1 from "../../img/monkey.png";
import { withRouter } from 'react-router-dom';

import { authenticationService } from "../../services/authentication";

class Login extends React.Component {
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
        label: "Username or email",
        function: this.handleChange.bind(this),
        placeholder: "Jake the dog",
        id: "Username"
      },
      {
        type: "password",
        name: "password",
        label: "Password",
        function: this.handleChange.bind(this),
        placeholder: "admin",
        id: "Password"
      }
    ];


    this.handleChange = this.handleChange.bind(this);
  }


  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  async sendRequest() {
    const resolved = await authenticationService.login(this.state.username, this.state.password);
    authenticationService.setIntoLocalStorage({ name: "currentUser", value: resolved.Response.Username });

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

  render() {
    if (localStorage.getItem("currentUser")) {
      this.props.history.push('/login');
    }
    return (
      <div>
        <div className="registerForm2 col-12 d-flex jusify-content-center flex-wrap">
          <img src={img1} className="img-fluid offset-5 col-2" alt="logo" />
          <h1 className="text-center col-12 mb-5">Join us now!</h1>
          <Form
            className="col-12 offset-lg-3 col-lg-6"
            onSubmit={e => {
              e.preventDefault();
              this.sendRequest();
            }}
          >
            {this.fields.map(element => (
              <FormField set={element} />
            ))}

            <button className="col-12 offset-lg-4 col-lg-4 btn blue-button">
              JOIN
            </button>
          </Form>
        </div>
      </div>
    );

  }
}

export default withRouter(Login);
