import React, { Component } from 'react'
import View from "./View.jsx";
import { authentication_service } from '../../../../../services/authentication/authentication';


export default class Container extends Component {

    constructor(){
        super();

        this.state = { "loaded": false, "index": 0, "answers": [], "currentFront": true };

        this.get = this.get.bind(this);
        this.shuffle = this.shuffle.bind(this);
        this.answer = this.answer.bind(this);
        this.nextFlashcard = this.nextFlashcard.bind(this);
        this.submitSession = this.submitSession.bind(this);
    }

    shuffle(cards){
        for (var i = cards.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = cards[i];
            cards[i] = cards[j];
            cards[j] = temp;
        }
    }

    async get() {
        const collection_id = localStorage.getItem("learnCollection");

        if (collection_id) {
            const collection = await authentication_service.collection.find({type: "id", name: collection_id} );


            console.log(collection.response.cards)
            this.setState({ ...this.state, "collection": collection.response });
            this.setState({ ...this.state, "loaded": true });
        }
        else {
            this.setState({ ...this.state, "collection": false });
            this.setState({ ...this.state, "loaded": true });
        }

        console.log(this.state)
    }

    answer(isCorrect){
        this.setState(state => ({ ...state, answers: [...state.answers, { cardId: state.collection.cards[state.index].id, correct: isCorrect}], currentFront: false }), console.log(this.state))
    }

    nextFlashcard(){
        this.setState(state => ({...state, currentFront: true, index: state.index+=1  }))
    }

    async submitSession(){
        const answers = this.state.answers;
        const statistics = await authentication_service.session.submit({sessionId: localStorage.getItem("Session"), reviews: answers, Token: localStorage.getItem("Token")} );

        localStorage.setItem("currentSessionStatictics", JSON.stringify(statistics.response))
    }

    componentDidMount() {
        this.get();
    }

    render() {
        return <View state={this.state} answer={this.answer} nextFlashcard={this.nextFlashcard} submitSession={this.submitSession}/>
    }
}
