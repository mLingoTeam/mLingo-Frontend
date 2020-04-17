import React from 'react'

import View from './CollectionScreenView'
import { authentication_service } from '../../../../../services/authentication/authentication';


class Collection extends React.Component {

    constructor() {
        super();

        this.state = [{ "loaded": false }];

        this.mountCollection = this.mountCollection.bind(this);
        this.removeCollection = this.removeCollection.bind(this);
        this.removeCard = this.removeCard.bind(this);
        this.modifyCollection = this.modifyCollection.bind(this);
        this.editCollection = this.editCollection.bind(this)

        this.functions = {
            mountCollection: this.mountCollection,
            removeCollection: this.removeCollection,
            removeCard: this.removeCard,
            modifyCollection: this.modifyCollection,
            editCollection: this.editCollection
        }
    }

    async mountCollection() {
        const collid = localStorage.getItem("collectionid");

        if (collid) {
            const collectioni = await authentication_service.collection.find({type: "id", name: collid} );

            this.setState({ ...this.state, "collection": collectioni.response.cards });
            this.setState({ ...this.state, "loaded": true });
        }
        else {
            this.setState({ ...this.state, "collection": false });
            this.setState({ ...this.state, "loaded": true });
        }
    }



    async removeCard(set) {
        //only looking for the first card
        const searchedValue = this.state.collection.find(element => ((element.term == set.term) && (element.definition == set.definition)));
        const new_collection = this.state.collection.filter(element => element !== searchedValue);
        this.setState(() => {
            return {
                ...this.state,
                collection: new_collection
            }
        })
    }

    componentWillUnmount() {
        localStorage.removeItem("collectionid")
    }

    componentDidMount() {
        this.mountCollection();
    }

    modifyCollection() {
        authentication_service.collection.update({ id: localStorage.getItem("collectionid"), token: localStorage.getItem("Token"), cards: this.state.collection })
    }

    removeCollection() {
        authentication_service.collection.remove(localStorage.getItem("collectionid"), localStorage.getItem("Token"));
        localStorage.removeItem("collectionid");
        this.setState({ ...this.state, "collection": false });
    }

    editCollection(){
        localStorage.setItem("editCollection", localStorage.getItem("collectionid"))
    }

    render() {
        return <View state={this.state} functions={this.functions}/>
    }
};

export default Collection;