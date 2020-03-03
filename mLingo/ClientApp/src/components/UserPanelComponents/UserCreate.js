import React from "react";

import { authenticationService } from "../../services/authentication";
import UserCreateCard from './UserCreateCard'

class UserCreate extends React.Component {
    constructor(props) {
        super(props);

        if (!localStorage.getItem("currentUser")) {
            this.props.history.push("/");
        }

        this.state = { collectionName: "", cards: [], card: { Term: "", Definition: "" } }

        this.createCollection = this.createCollection.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleCardChange = this.handleCardChange.bind(this);
        this.addCard = this.addCard.bind(this);
    }

    addCard() {
        if (this.state.card.Term === '' || this.state.card.Definition === '') {
            alert("Fields Term and Description cannot be empty!")
        }
        else {
            this.setState({ ...this.state, cards: this.state.cards.push(this.state.card) })
            this.setState({ ...this.state, card: { Term: "", Definition: "" } })
        }
    }

    handleCardChange(event) {
        this.setState({ ...this.state, card: { ...this.state.card, [event.target.name]: event.target.value } });
    }

    handleChange(event) {
        this.setState({ ...this.state, [event.target.name]: event.target.value });
    }



    createCollection() {
        authenticationService.createCollection(this.state.collectionName, this.state.cards, localStorage.getItem("ID"), localStorage.getItem("Token"));
        console.log('created!')
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
                        <p>collection name</p>
                        <input name="collectionName" type="text" onChange={this.handleChange} />
                        <UserCreateCard set={this.state} functioni={this.handleCardChange} functionii={this.addCard} />

                        <p>Your collection:</p>
                        <p>{JSON.stringify(this.state.collectionName)}</p>
                        <p>{JSON.stringify(this.state.cards)}</p>
                        <button onClick={this.createCollection}>Create</button>
                        <p> -----------------</p>
                        <button onClick={this.logout}>Logout</button>
                    </div>
                </div>
            </div >
        );
    }
}

export default UserCreate;