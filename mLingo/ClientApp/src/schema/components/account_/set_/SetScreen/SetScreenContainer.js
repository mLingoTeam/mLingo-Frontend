import React from 'react'
import View from './SetScreenView'
import { authentication_service } from '../../../../../services/authentication/authentication';
import Loading from '../../../loading/Loading'
import setCreateHelper from '../SetCreate/SetCreateHelper'

class SetScreenContainer extends React.Component {

    constructor() {
        super();

        this.state = { "loaded": false, searchedValue: [ ], set: { collections: [] }, edit: false };

        this.getSet = this.getSet.bind(this);
        this.searchCollection = this.searchCollection.bind(this);
        this.addCollectionToSet = this.addCollectionToSet.bind(this);
        this.submitSetForm = this.submitSetForm.bind(this);

        this.functions = {
            searchCollection: this.searchCollection,
            addCollectionToSet :this.addCollectionToSet,
            submitSetForm: this.submitSetForm
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

            this.setState({ ...this.state, "set": set.response });
            this.setState({ ...this.state, "loaded": true, edit: true });
        }
        else {
            this.setState({ ...this.state, "set": false });
            this.setState({ ...this.state, "loaded": true, edit: false });
        }
    }

    addCollectionToSet(name){
        const finder = this.state.searchedValue.find( item => item.id === name)
        this.setState( state => { return { ...state, set: { ...state.set, collections: [...state.set.collections, finder]}}})
    }

    componentWillUnmount() {
        localStorage.removeItem("setid")
    }

    componentDidMount() {
        this.getSet();
    }

    submitSetForm(){

        this.state.edit ? authentication_service.set.update( {
            id: this.state.set.id,
            cards: this.state.set.collections,
            token: localStorage.getItem("Token"),
            description: this.state.set.description,
            name: this.state.set.name
        } )
        : authentication_service.set.create( {
            id: this.state.set.id,
            cards: this.state.set.collections,
            token: localStorage.getItem("Token"),
            description: this.state.set.description,
            name: this.state.set.name
        } );
    }

    render() {
        if(this.state.loaded){
            return <View state={this.state.set} functions={this.functions} searched={this.state.searchedValue}/>
        }
        return <Loading/>

    }
};

export default SetScreenContainer;