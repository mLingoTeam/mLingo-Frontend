import React from "react";

import { authenticationService } from "../services/authentication";

class UserPanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: authenticationService.currentUserValue
    };
  }

  render() {
    const { currentUser } = this.state;
    return (
      <div>
        <h1>Hi {currentUser.firstName}!</h1>
        <p>You're logged in with React & JWT!!</p>
      </div>
    );
  }
}

export default { UserPanel };
