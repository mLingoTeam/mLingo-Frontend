import React from 'react'
import View from './SetScreenView'
import { authentication_service } from '../../../../../services/authentication/authentication';
import Loading from '../../../loading/Loading'
import setCreateHelper from '../SetCreate/SetCreateHelper'

class SetScreenContainer extends React.Component {

    constructor() {
        super();

        this.state = { "loaded": false, searchedValue: [ {name: 'default'} ], set: { collections: [] } };

        this.getSet = this.getSet.bind(this);
        this.searchCollection = this.searchCollection.bind(this);
        this.removeCollection = this.removeCollection.bind(this);
        this.editCollection = this.editCollection.bind(this)

        this.functions = {
            removeCollection: this.removeCollection,
            editCollection: this.editCollection,
            searchCollection: this.searchCollection
        }
    }

    async searchCollection(value){
        let searchedValue = setCreateHelper.searchCollection(value);
        searchedValue.then( resolved => this.setState( state => { return { ...state, searchedValue: resolved.response }}) )
    }

    async getSet() {
        const set_id = localStorage.getItem("setid");

        if (set_id) {
            const set = await authentication_service.set.find({type: "id", name: set_id} );
            console.log(set)

            this.setState({ ...this.state, "set": set.response });
            this.setState({ ...this.state, "loaded": true });
        }
        else {
            this.setState({ ...this.state, "set": false });
            this.setState({ ...this.state, "loaded": true });
        }
    }

    removeCollection() {
        authentication_service.set.remove({id: localStorage.getItem("setid"), token: localStorage.getItem("Token")});
        localStorage.removeItem("setid");
        this.setState({ ...this.state, "set": false });
    }

    editCollection(){
        localStorage.setItem("editCollection", localStorage.getItem("collectionid"))
    }

    componentWillUnmount() {
        localStorage.removeItem("setid")
    }

    componentDidMount() {
        this.getSet();
    }

    render() {
        console.log(this.state)
        if(this.state.loaded){
            return <View state={this.state.set} functions={this.functions} searched={this.state.searchedValue}/>
        }
        return <Loading/>

    }
};

export default SetScreenContainer;