import React from "react";

import  requests  from '../CollectionScreen/requests'
import { authentication_service } from "../../../../../services/authentication/authentication";
import View from  './CollectionCreateView'

class CollectionCreateContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = { collectionTitle: "", collectionDescription:"", cards: [ { term: "", definition: "" } ], loading: false, edit: false }


        this.submit = this.submit.bind(this);
        this.modifyCollection = this.modifyCollection.bind(this);
        this.mount = this.mount.bind(this);
        this.createCollection = this.createCollection.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleCardChange = this.handleCardChange.bind(this);
        this.addCard = this.addCard.bind(this);
        this.removeCard = this.removeCard.bind(this);

        this.functions = {
        submit:   this.submit,
        modifyCollection: this.modifyCollection,
        mount: this.mount,
        createCollection: this.createCollection,
        handleChange: this.handleChange,
        handleCardChange: this.handleCardChange,
        addCard: this.addCard,
        removeCard: this.removeCard,
        }


        // editing mode
        if ( localStorage.getItem("editCollection") ){
            this.mount();
        }
    }

    async mount(){

        this.setState({ ...this.state, loading: true });
            const req = await requests.mountEditCollection();
            console.log(req);
            this.setState({ ...this.state, cards: req.response.cards, collectionTitle: req.response.name, collectionDescription: req.response.description, loading: false, edit: true });
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

    submit(){
        if( this.state.edit){
            console.log('modify!')
            this.modifyCollection()
        }
        else{
            console.log('create!')
            this.createCollection()
        }
    }

    modifyCollection() {
        authentication_service.collection.update({ id: localStorage.getItem("editCollection"), token: localStorage.getItem("Token"), cards: this.state.cards, name: this.state.collectionTitle })
    }

    async createCollection() {

        let title = this.state.collectionTitle;
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
                this.setState({ collectionTitle: "",collectionDescription:"", cards: [{ term: "", definition: "" }]});
            }
            else{
                await authentication_service.collection.create(this.state.collectionTitle, this.state.collectionDescription, this.state.cards, localStorage.getItem("Token"));
                this.setState({ collectionTitle: "", collectionDescription:"", cards: [] });
            }
        }

    }

    componentWillUnmount(){
        // editing mode
        localStorage.removeItem("editCollection")
    }

    render() {

        if(this.state.loading){
            return <div>loading</div>
        }
        else{
            return <View state={this.state} functions={this.functions}/>
        }
    }
}

export default CollectionCreateContainer;