import React from "react";
import CardComponent from './UserPanelComponents/CardComponent'

import { authenticationService } from "../services/authentication";

class UserPanel extends React.Component {
  constructor(props) {
    super(props);

    if (!localStorage.getItem("currentUser")) {
      this.props.history.push("/");
    }

    this.state = { fields: [], exist: null, request: "example1" }

    this.findcollection = this.findcollection.bind(this);
    this.changeRequest = this.changeRequest.bind(this);
  }

  changeRequest(event) {
    this.setState({ "request": event.target.value });
  }

  async findcollection() {
    const collectiondata = await authenticationService.requestCollection(this.state.request);
    console.log(collectiondata);
    if (collectiondata.Successful === true) {
      this.setState({ "fields": collectiondata.Response, "exist": true });
    }
    else {
      console.log("false")
      this.setState({ "fields": [], "exist": false });
    }
  }

  logout = () => {
    authenticationService.logout();
    //it works because localStorage is empty imidiately
    window.location.reload();
  };

  render() {
    return (
      <div>
        <div className="mainpanel">
          <div className="mainpanel__userbase">
            <h1>Hi {localStorage.getItem("currentUser")}!</h1>
            <h3>Welcome in MLingo!</h3>
            <p>Search collection by user or by name!</p>
            <input type="text" onChange={this.changeRequest} />
            <button onClick={this.findcollection}>Find</button>
            <button onClick={this.logout}>Logout</button>

          </div>
        </div>
        {
          this.state.exist ? this.state.fields.map(element => (
            <CardComponent set={element} />
          )) : this.state.exist === false ? <h2> No collection found </h2> : <span>Search cards</span>
        }
      </div>
    );
  }
}

export default UserPanel;
