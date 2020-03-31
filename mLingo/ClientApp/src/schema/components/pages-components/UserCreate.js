import React from "react";

import { authenticationService } from "../../../services/authentication";
import UserCreateCollection from '../CardComponents/UserCreateCollection'
import AddFlashcard from '../CardComponents/AddFlashcard';

import { FaPlus } from 'react-icons/fa'

class UserCreate extends React.Component {
    constructor(props) {
        super(props);

        if (!localStorage.getItem("currentUser")) {
            this.props.history.push("/");
        }

        this.state = { collectionTitle: "", cards: [ { term: "", definition: "" } ], card: { term: "", definition: "" } }

        this.createCollection = this.createCollection.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleCardChange = this.handleCardChange.bind(this);
        this.addCard = this.addCard.bind(this);
        this.removeCard = this.removeCard.bind(this);
    }

    addCard() {
            this.setState({ ...this.state, cards: this.state.cards.push(this.state.card) })
            this.setState({ ...this.state, card: { term: "", definition: "" } })
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

        this.setState((state)=>{
            return{
                ...state,
                cards: state.cards.filter(el => (el.term != '' || el.definition != ''))
            }
        })

        if(this.state.collectionTitle == ""){
            alert('Name your collection!')
            return
        }
        else if( this.state.cards.length == 1 ){
            alert("Add more cards")
            return
        }
        else{
            authenticationService.createCollection(this.state.collectionTitle, this.state.cards, localStorage.getItem("ID"), localStorage.getItem("Token"));
            this.setState({ collectionTitle: "", cards: [], card: { term: "", definition: "" } });
        }


    }

    render() {
        console.log(this.state)
        return (
            <div className="d-flex justify-content-center flex-wrap">
                <UserCreateCollection set={this.state} handleChange={this.handleCardChange} />
                {
                    this.state.cards.map((element, index) => {
                        return <AddFlashcard set={element} remove={this.removeCard} index={index} functioni={this.handleCardChange} functionii={this.addCard}/>
                    })
                }
                <div>
                    <button onClick={this.addCard} className="plus-button"><FaPlus /></button>
                    <button onClick={this.createCollection} className="green-button"> create collection </button>
                </div>
            </div >
        );
    }
}

export default UserCreate;