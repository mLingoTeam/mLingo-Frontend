import React from "react";
import { Form } from "reactstrap";
import FormField from "./FormField";
import img1 from "../../img/monkey.png";
import { withRouter } from 'react-router-dom';
import { authenticationService } from "../../services/authentication";

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
        label: "Username",
        function: this.handleChange.bind(this),
        placeholder: "Jake the dog",
        id: "Username"
      },
      {
        type: "email",
        name: "email",
        label: "Email",
        function: this.handleChange.bind(this),
        placeholder: "Jake@dogmail.com",
        id: "Email"
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

  async sendLoginRequest() {
    const resolved = await authenticationService.login(this.state.username, this.state.password);

    //if there is not such an user
    const resstatus = (JSON.stringify(resolved.successful));

    if (resstatus == 'false') {
      const err = (JSON.stringify(resolved.errorMessage));
      alert(err);
    } // if the user exist save they into the web
    else {
      authenticationService.setIntoLocalStorage({ name: "currentUser", value: resolved.response.username });
      authenticationService.setIntoLocalStorage({ name: "ID", value: resolved.response.id });
      authenticationService.setIntoLocalStorage({ name: "Token", value: resolved.response.token });
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

  async sendRequest() {
    const req = await authenticationService.register(
      this.state.username,
      this.state.email,
      this.state.password
    );

    this.sendLoginRequest();
  }

  render() {
    if (localStorage.getItem("currentUser")) {
      this.props.history.push('/head');
    }

    return (
      <div>
        <div className="registerForm2 col-12 d-flex jusify-content-center flex-wrap">
          <img src={img1} className="img-fluid offset-5 col-2" alt="logo" />
          <h1 className="text-center col-12 mb-5">Join us now!</h1>
          <Form
            className="col-12 offset-lg-3 col-lg-6"
            onSubmit={e => {
              this.sendRequest();
              e.preventDefault();
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

export default withRouter(Register);
