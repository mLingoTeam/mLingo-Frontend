import React from "react";

import { authenticationService } from "../../services/authentication";
import UserCreateCard from './UserCreateCard'

class UserCreate extends React.Component {
    constructor(props) {
        super(props);

        if (!localStorage.getItem("currentUser")) {
            this.props.history.push("/");
        }

        this.state = { collectionName: "", cards: [{ Term: "Term", Definition: "Definition" }] }

        this.createCollection = this.createCollection.bind(this);
        this.addCard = this.addCard.bind(this);
    }

    addCard(event) {
        this.setState({ [event.target.name]: event.target.value });
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
                        <UserCreateCard set={this.state.cards} functioni={this.addCard} />

                        <button onClick={this.logout}>Logout</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserCreate;