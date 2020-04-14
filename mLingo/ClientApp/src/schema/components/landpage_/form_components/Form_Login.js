import React from "react";
import { Form } from "reactstrap";
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

import Form_Input from "./Form_Input";
import { authentication_service } from "../../../../services/authentication";

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
  }


  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  async sendRequest() {
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

  render() {
    return (
      <div>
        <div className="registerForm2 col-12 d-flex jusify-content-center flex-wrap">
          <Form
            className="col-12 offset-lg-3 col-lg-6"
            onSubmit={e => {
              e.preventDefault();
              this.sendRequest();
            }}
          >
            <h1 className="col-12 mb-5">sign in</h1>
            {this.fields.map(element => (
              <Form_Input set={element} />
            ))}

            {
              this.state.err != false ? <p>{this.state.err}</p> : undefined
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
