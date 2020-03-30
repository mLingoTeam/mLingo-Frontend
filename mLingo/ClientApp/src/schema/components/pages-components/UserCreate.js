import React from "react";

import { authenticationService } from "../../../services/authentication";
import UserCreateCard from '../CardComponents/UserCreateCard'
import AddFlashcard from '../CardComponents/AddFlashcard';

import { FaPlus } from 'react-icons/fa'

class UserCreate extends React.Component {
    constructor(props) {
        super(props);

        if (!localStorage.getItem("currentUser")) {
            this.props.history.push("/");
        }

        this.state = { collectionName: "", cards: [], card: { term: "", definition: "" } }

        this.createCollection = this.createCollection.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleCardChange = this.handleCardChange.bind(this);
        this.addCard = this.addCard.bind(this);
        this.removeCard = this.removeCard.bind(this);
    }

    addCard() {
        if (this.state.card.term === '' || this.state.card.definition === '') {
            alert("Fields Term and Description cannot be empty!")
        }
        else {
            this.setState({ ...this.state, cards: this.state.cards.push(this.state.card) })
            this.setState({ ...this.state, card: { term: "", definition: "" } })
        }
    }

    removeCard(set) {
        //only looking for the first card
        const searchedValue = this.state.cards.find(element => ((element.term == set.term) && (element.definition == set.definition)));
        this.setState(() => {
            return {
                ...this.state,
                cards: this.state.cards.filter(element => element !== searchedValue)
            }
        })
    }

    handleCardChange(event) {
        this.setState({ ...this.state, card: { ...this.state.card, [event.target.name]: event.target.value } });
    }

    handleChange(event) {
        this.setState({ ...this.state, [event.target.name]: event.target.value });
    }



    createCollection() {
        authenticationService.createCollection(this.state.collectionName, this.state.cards, localStorage.getItem("ID"), localStorage.getItem("Token"));
        this.setState({ collectionName: "", cards: [], card: { term: "", definition: "" } });
    }

    render() {
        return (
            <div className="d-flex justify-content-center flex-wrap">
                <div className="d-flex justify-content-center flex-wrap mb-5">
                    <h1>Collection name</h1>
                    <input name="collectionName" type="text" onChange={this.handleChange} value={this.state.collectionName} required />
                </div>
                <UserCreateCard set={this.state} functioni={this.handleCardChange} functionii={this.addCard} />
                {
                    this.state.cards.map((element, index) => {
                        return <AddFlashcard set={element} remove={this.removeCard} index={index}/>
                    })
                }
                <div>
                    <button onClick={this.createCollection} className="plus-button "><FaPlus /></button>
                </div>
            </div >
        );
    }
}

export default UserCreate;