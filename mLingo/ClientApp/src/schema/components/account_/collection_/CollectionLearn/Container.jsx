import React, { Component } from 'react'
import View from "./View.jsx";
import { authentication_service } from '../../../../../services/authentication/authentication';


export default class Container extends Component {

    constructor(){
        super();

        this.state = { "loaded": false };

        this.get = this.get.bind(this);
        this.startSession = this.startSession.bind(this);
    }
    async get() {
        const collection_id = localStorage.getItem("learnCollection");

        if (collection_id) {
            const collection = await authentication_service.collection.find({type: "id", name: collection_id} );

            this.setState({ ...this.state, "collection": collection.response });
            this.setState({ ...this.state, "loaded": true });
        }
        else {
            this.setState({ ...this.state, "collection": false });
            this.setState({ ...this.state, "loaded": true });
        }
    }

    async startSession(){
        const session = await authentication_service.session.create({collectionId: this.state.collection.id, Token: localStorage.getItem("Token")})
        console.log(session);
        localStorage.setItem("Session", session.response.sessionId)
    }

    componentDidMount() {
        this.get();
    }

    render() {
        return <View state={this.state} startSession={this.startSession}/>
    }
}
