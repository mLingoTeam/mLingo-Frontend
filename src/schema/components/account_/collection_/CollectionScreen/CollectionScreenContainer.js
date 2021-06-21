import React from 'react'

import View from './CollectionScreenView'
import { authentication_service } from '../../../../../services/authentication/authentication';


class Collection extends React.Component {

    constructor() {
        super();

        this.state = [{ "loaded": false }];

        this.get = this.get.bind(this);
        this.remove = this.remove.bind(this);
        this.edit = this.edit.bind(this);
        this.learn = this.learn.bind(this);

        this.functions = {
            remove: this.remove,
            edit: this.edit,
            learn: this.learn
        }
    }

    async get() {
        const collection_id = localStorage.getItem("collectionid");

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

    remove() {
        authentication_service.collection.remove({id: localStorage.getItem("collectionid"), token: localStorage.getItem("Token")});
        localStorage.removeItem("collectionid");
        this.setState({ ...this.state, "collection": false });
    }

    edit(){
        localStorage.setItem("editCollection", localStorage.getItem("collectionid"))
    }

    learn(){
        localStorage.setItem("learnCollection", localStorage.getItem("collectionid"))
    }

    componentWillUnmount() {
        localStorage.removeItem("collectionid")
    }

    componentDidMount() {
        this.get();
    }

    render() {
        return <View state={this.state} functions={this.functions}/>
    }
};

export default Collection;