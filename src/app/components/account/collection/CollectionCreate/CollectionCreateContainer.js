import React from "react";

import helper from './CollectionCreateHelper';
import View from  './CollectionCreateView';

class CollectionCreateContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = { collectionTitle: "", collectionDescription:"", cards: [ { term: "", definition: "" } ], loading: false, edit: false }


        this.mountCollection = this.mountCollection.bind(this);

        this.addEmptyCard = this.addEmptyCard.bind(this);
        this.removeCard = this.removeCard.bind(this);

        this.handleCreate = this.handleCreate.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleCardChange = this.handleCardChange.bind(this);

        this.submit = this.submit.bind(this);

        this.checkCardsLength = this.checkCardsLength.bind(this);

        this.functions = {
            submit:   this.submit,
            handleChange: this.handleChange,
            handleCardChange: this.handleCardChange,
            addEmptyCard: this.addEmptyCard,
            removeCard: this.removeCard,
        }

        // editing mode
        if ( localStorage.getItem("editCollection") ){
            this.mountCollection();
        }
    }

    async mountCollection(){
        this.setState({ ...this.state, loading: true });
        const req = await helper.getCollection();
        this.setState({ ...this.state, cards: req.response.cards, collectionTitle: req.response.name, collectionDescription: req.response.description, loading: false, edit: true });
    }

    addEmptyCard() {
        this.setState(state => { return { ...state, cards: [...state.cards, { term: "", definition: "" }] }});
    }

    //  this.state => state
    removeCard(set) {
        //only looking for the first card
        const searchedValue = this.state.cards.find(element => ((element.term == set.term) && (element.definition == set.definition)));
        this.setState( state => { return { ...state, cards: state.cards.filter(element => element !== searchedValue)}});
    }

    // Changing Card values
    handleCardChange(event) {
        let items = this.state.cards;
        let item = items[event.target.alt];
        item = {...item, [event.target.name]: event.target.value}
        items[[event.target.alt]] = item;

        this.setState({...this.state, cards: items });
    }

    handleChange(event) {
        this.setState({ ...this.state, [event.target.name]: event.target.value });
    }

    checkCardsLength(cards){
        if( cards.length <= 1 ){
            alert("Add more cards")
            this.setState({ ...this.state, cards: [...this.state.cards, { term: "", definition: "" }] });
            return false;
        }
        else return true
    }

    handleCreate(){
        let title = this.state.collectionTitle;
        if(title.trim() === ""){ alert('Name your collection!'); return false; }
        else{
            const cards_to_check = this.state.cards.filter(el => (el.term.trim() != '' && el.definition.trim() != ''));
            return this.checkCardsLength(cards_to_check);
        }
    }

    // Sendint the right request
    submit(){
        if(this.state.edit){
            helper.modifyCollection({ id: localStorage.getItem("editCollection"), cards: this.state.cards, name: this.state.collectionTitle, description: this.state.collectionDescription});
            localStorage.removeItem("editCollection");
            this.setState({ collectionTitle: "", collectionDescription: "" , cards: [ { term: "", definition: "" } ] });
        }
        else{
            if(this.handleCreate()){
                const cards = this.state.cards.filter(el => (el.term.trim() != '' && el.definition.trim() != ''));
                const created = helper.createCollection({cards: cards, name: this.state.collectionTitle, description: this.state.collectionDescription});
                console.log(created);
                this.setState({ collectionTitle: "", collectionDescription: "" , cards: [ { term: "", definition: "" } ] });
            }
        }

        //localStorage.setItem("current_collection", )
    }

    componentWillUnmount(){
        localStorage.removeItem("editCollection");
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