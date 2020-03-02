import React from "react";

import { authenticationService } from "../../services/authentication";
import UserCreateCard from './UserCreateCard'

class UserCreate extends React.Component {
    constructor(props) {
        super(props);

        if (!localStorage.getItem("currentUser")) {
            this.props.history.push("/");
        }

        this.state = { collectionName: "", cards: [], card: { Term: "", Description: "" } }

        this.createCollection = this.createCollection.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.addCard = this.addCard.bind(this);
    }

    addCard() {
        this.setState({ ...this.state, cards: this.state.cards.push(this.state.card) })
        this.setState({ ...this.state, card: { Term: "", Description: "" } })
    }

    handleChange(event) {
        this.setState({ ...this.state, card: { ...this.state.card, [event.target.name]: event.target.value } });
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
                        <UserCreateCard set={this.state.cards} functioni={this.handleChange} functionii={this.addCard} />

                        <button onClick={this.logout}>Logout</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserCreate;