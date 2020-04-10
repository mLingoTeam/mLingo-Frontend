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

        this.state = { collectionTitle: "", cards: [ { term: "", definition: "" } ] }

        this.createCollection = this.createCollection.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleCardChange = this.handleCardChange.bind(this);
        this.addCard = this.addCard.bind(this);
        this.removeCard = this.removeCard.bind(this);
    }

    addCard() {
            this.setState(state => {
                return {
                ...state,
                 cards: [...state.cards, { term: "", definition: "" }]
                }
            })
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

        let items = this.state.cards

        let item = items[event.target.alt];

        item = {...item, [event.target.name]: event.target.value}

        items[[event.target.alt]] = item;

        this.setState({
            ...this.state,
            cards: items
        });
    }

    handleChange(event) {
        this.setState({ ...this.state, [event.target.name]: event.target.value });
    }

    async createCollection() {

        let title = this.state.collectionTitle;
        console.log(title)
        if(title.trim() === ""){
            alert('Name your collection!')
        }
        else{
            await this.setState((state)=>{
                return{
                    ...state,
                    cards: state.cards.filter(el => (el.term.trim() != '' && el.definition.trim() != ''))
                }
            })
            if( this.state.cards.length <= 1 ){
                alert("Add more cards")
                this.setState({ collectionTitle: "", cards: [{ term: "", definition: "" }], card: { term: "", definition: "" } });
                return
            }
            else{
                await authenticationService.createCollection(this.state.collectionTitle, this.state.cards, localStorage.getItem("ID"), localStorage.getItem("Token"));
                this.setState({ collectionTitle: "", cards: [], card: { term: "", definition: "" } });
            }
        }

    }

    render() {
        return (
            <div className="d-flex justify-content-center flex-wrap">
                <UserCreateCollection set={this.state} handleChange={this.handleChange} />
                {
                    this.state.cards.map((element, index) => {
                        return <AddFlashcard set={element} remove={this.removeCard} index={index} functioni={this.handleCardChange} functionii={this.addCard}/>
                    })
                }
                <div className="col-12 d-flex justify-content-center flex-wrap">
                        <button onClick={this.addCard} className="plus-button"><FaPlus /></button>
                        <h3 className="col-12 text-center color-dark-blue">Add more cards</h3>
                </div>
                <button onClick={this.createCollection} className="green-button"> create collection </button>
            </div >
        );
    }
}

export default UserCreate;