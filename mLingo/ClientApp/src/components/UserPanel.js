import React from "react";

import { authenticationService } from "../services/authentication";

class UserPanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      //currentUser: authenticationService.currentUserValue
    };

    if (!localStorage.getItem("currentUser")) {
      this.props.history.push("/login");
    }
  }

  render() {
    const { currentUser } = this.state;
    return (
      <div>
        <h1>Hi {localStorage.getItem("currentUser")}!</h1>
        <p>You're logged in with React & JWT!!</p>
        <button onClick={authenticationService.logout}>Logout</button>
      </div>
    );
  }
}

export default UserPanel;
