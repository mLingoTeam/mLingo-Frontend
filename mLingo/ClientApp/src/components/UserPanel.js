import React from "react";
import CardComponent from './UserPanelComponents/CardComponent'

import { authenticationService } from "../services/authentication";

class UserPanel extends React.Component {
  constructor(props) {
    super(props);

    if (!localStorage.getItem("currentUser")) {
      this.props.history.push("/");
    }

    this.state = { fields: [], exist: null, type: 'username', request: "example1" }

    this.findcollection = this.findcollection.bind(this);
    this.changeRequest = this.changeRequest.bind(this);
  }

  changeRequest(event) {
    this.setState({ "request": event.target.value });
  }
  changeRequestType(event) {
    console.log(event)
  }


  async findcollection() {
    const collectiondata = await authenticationService.requestCollection(this.state.type, this.state.request);
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
            <div>
              <div><input type="radio" name="radAnswer" value="username" checked onChange={this.changeRequestType} /> <label>Search by username</label></div>
              <div><input type="radio" name="radAnswer" value="name" onChange={this.changeRequestType} /> <label>Search by set name</label></div>
            </div>
            <input className="searchcollectioninput" type="text" onChange={this.changeRequest} />
            <button onClick={this.findcollection}>Find</button>
            <button onClick={this.logout}>Logout</button>

          </div>
        </div>
        {
          this.state.exist ? this.state.fields.map(element => (
            <CardComponent set={element} />
          )) : this.state.exist === false ? <div className="container text-center"><h2> No collection found </h2></div> : <div className="container text-center"><h2> No collection found </h2></div>
        }
      </div>
    );
  }
}

export default UserPanel;
