import React from "react";

import { authenticationService } from "../services/authentication";

class UserPanel extends React.Component {
  constructor(props) {
    super(props);

    if (!localStorage.getItem("currentUser")) {
      this.props.history.push("/");
    }
  }
  logout = () => {
    authenticationService.logout();
    //it works because localStorage is empty imidiately
    window.location.reload();
  };

  render() {
    console.log(localStorage.getItem("currentUser"));
    return (
      <div>
        <h1>Hi {localStorage.getItem("currentUser")}!</h1>
        <p>You're logged in with React & JWT!!</p>
        <button onClick={this.logout}>Logout</button>
      </div>
    );
  }
}

export default UserPanel;
