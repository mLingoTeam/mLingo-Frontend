import React from "react";
import { Link } from 'react-router-dom'

import  requests  from '../../../services/requests'
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

        this.state = { collectionTitle: "", collectionDescription:"", cards: [ { term: "", definition: "" } ], loading: false, edit: false }


        this.submit = this.submit.bind(this);
        this.modifyCollection = this.modifyCollection.bind(this);
        this.mount = this.mount.bind(this);
        this.createCollection = this.createCollection.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleCardChange = this.handleCardChange.bind(this);
        this.addCard = this.addCard.bind(this);
        this.removeCard = this.removeCard.bind(this);

        if ( localStorage.getItem("editCollection") ){
            this.mount();
        }
    }

    async mount(){
        this.setState({ ...this.state, loading: true });
            const req = await requests.mountEditCollection();
            console.log(req.response);
            this.setState({ ...this.state, cards: req.response.cards, collectionTitle: req.response.name, loading: false, edit: true });
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
        this.setState({ ...this.state, [event.target.name]: event.target.value }, console.log(this.state));

    }

    submit(){
        if( this.state.edit){
            this.modifyCollection()
        }
        else{
            this.createCollection()
        }
    }

    modifyCollection() {
        authenticationService.updateCollection({ id: localStorage.getItem("editCollection"), token: localStorage.getItem("Token"), cards: this.state.cards, name: this.state.collectionTitle })
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
                this.setState({ collectionTitle: "", cards: [{ term: "", definition: "" }]});
                return
            }
            else{
                await authenticationService.createCollection(this.state.collectionTitle, this.state.collectionDescription, this.state.cards, localStorage.getItem("Token"));
                this.setState({ collectionTitle: "", cards: [] });
            }
        }

    }

    componentWillUnmount(){
        localStorage.removeItem("editCollection")
    }

    render() {
        if(this.state.loading){
            return <div>loading</div>
        }
        else{
            return (
                <div className="d-flex justify-content-center flex-wrap p-5">
                    <UserCreateCollection set={this.state} handleChange={this.handleChange} edit={this.state.edit}/>
                    {
                        this.state.cards.map((element, index) => {
                            return <AddFlashcard set={element} remove={this.removeCard} index={index} functioni={this.handleCardChange} functionii={this.addCard}/>
                        })
                    }
                    <div className="col-12 d-flex justify-content-center flex-wrap align-items-center m-5">
                            <button onClick={this.addCard} className="plus-button m-5"><FaPlus /></button>
                            <h3 className="text-center color-dark-blue">add more cards</h3>
                    </div>
                    <Link to="/head" onClick={this.submit}  className="green-button"> {this.state.edit ? "edit collection" : "create collection"} </Link>
                </div >
            );
        }
    }
}

export default UserCreate;