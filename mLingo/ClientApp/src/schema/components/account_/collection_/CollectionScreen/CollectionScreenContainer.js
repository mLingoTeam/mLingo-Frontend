import React from 'react'

import View from './CollectionScreenView'
import { authentication_service } from '../../../../../services/authentication';
import  requests  from './requests';


class Collection extends React.Component {

    constructor() {
        super();

        this.state = [{ "loaded": false }];

        this.mountCollection = requests.mountCollection.bind(this);
        this.removeCollection = this.removeCollection.bind(this);
        this.removeCard = this.removeCard.bind(this);
        this.modifyCollection = this.modifyCollection.bind(this);
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
        return <View that={this.state} />
    }
};

export default Collection;