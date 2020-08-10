import React from 'react'
import View from './SetScreenView'
import { authentication_service } from '../../../../../services/authentication/authentication';
import Loading from '../../../loading/Loading'
import setCreateHelper from '../SetCreate/SetCreateHelper'

class SetScreenContainer extends React.Component {

    constructor() {
        super();

        this.state = { "loaded": false, searchedValue: [ ], set: { collections: [] } };

        this.getSet = this.getSet.bind(this);
        this.searchCollection = this.searchCollection.bind(this);
        this.removeCollection = this.removeCollection.bind(this);
        this.editCollection = this.editCollection.bind(this);
        this.addCollectionToSet = this.addCollectionToSet.bind(this);

        this.functions = {
            removeCollection: this.removeCollection,
            editCollection: this.editCollection,
            searchCollection: this.searchCollection,
            addCollectionToSet :this.addCollectionToSet
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

    addCollectionToSet(name){
        const finder = this.state.searchedValue.find( item => item.id === name)
        console.log(finder)
        this.setState( state => { return { ...state, set: { ...state.set, collections: [...state.set.collections, finder]}}}, console.log(this.state))
        console.log(this.state)
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