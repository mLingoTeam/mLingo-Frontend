import React from "react";

import { authenticationService } from "../../../services/authentication";
import UserCreateCard from '../CardComponents/UserCreateCard'
import Flashcard from '../CardComponents/Flashcard';

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
        this.setState({ collectionName: "", cards: [], card: { Term: "", Definition: "" } });
    }

    render() {
        return (
            <div className="d-flex justify-content-center flex-wrap flex-column">
                <div className="d-flex justify-content-center flex-wrap mb-5">
                    <h1>Collection name</h1>
                    <input name="collectionName" type="text" onChange={this.handleChange} value={this.state.collectionName} required />
                </div>
                <UserCreateCard set={this.state} functioni={this.handleCardChange} functionii={this.addCard} />
                {
                    this.state.cards.map(element => {
                        return <Flashcard set={element} />
                    })
                }
                <button onClick={this.createCollection} className="green-button offset-4 col-4 mt-5 ">Create Collection</button>
            </div >
        );
    }
}

export default UserCreate;