import React from 'react'

import View from './CollectionScreenView'
import { authentication_service } from '../../../../../services/authentication/authentication';


class Collection extends React.Component {

    constructor() {
        super();

        this.state = [{ "loaded": false }];

        this.mountCollection = this.mountCollection.bind(this);
        this.removeCollection = this.removeCollection.bind(this);
        this.editCollection = this.editCollection.bind(this)

        this.functions = {
            removeCollection: this.removeCollection,
            editCollection: this.editCollection
        }
    }

    async getCollection() {
        const collection_id = localStorage.getItem("collectionid");

        if (collection_id) {
            const collection = await authentication_service.collection.find({type: "id", name: collection_id} );

            this.setState({ ...this.state, "collection": collection.response.cards });
            this.setState({ ...this.state, "loaded": true });
        }
        else {
            this.setState({ ...this.state, "collection": false });
            this.setState({ ...this.state, "loaded": true });
        }
    }

    removeCollection() {
        authentication_service.collection.remove(localStorage.getItem("collectionid"), localStorage.getItem("Token"));
        localStorage.removeItem("collectionid");
        this.setState({ ...this.state, "collection": false });
    }

    editCollection(){
        localStorage.setItem("editCollection", localStorage.getItem("collectionid"))
    }

    componentWillUnmount() {
        localStorage.removeItem("collectionid")
    }

    componentDidMount() {
        this.mountCollection();
    }

    render() {
        return <View state={this.state} functions={this.functions}/>
    }
};

export default Collection;