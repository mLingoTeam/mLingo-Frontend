import React from "react";

import { authenticationService } from "../../services/authentication";

class UserCreate extends React.Component {
    constructor(props) {
        super(props);

        if (!localStorage.getItem("currentUser")) {
            this.props.history.push("/");
        }

        this.state = { collectionName: "", cards: [{ Term: "Term", Definition: "Definition" }] }

        this.createCollection = this.createCollection.bind(this);
    }


    createCollection() {
        authenticationService.createCollection(this.state.collectionName, this.state.cards);
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
                        <h3>Create your own collection here!</h3>
                        <p>Just type here</p>
                        <input className="searchcollectioninput" type="text" onChange={this.changeRequest} />
                        <button onClick={this.findcollection}>Find</button>
                        <button onClick={this.logout}>Logout</button>

                    </div>
                </div>
            </div>
        );
    }
}

export default UserCreate;