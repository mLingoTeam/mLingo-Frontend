import React from 'react'
import View from './SetScreenView'
import { authentication_service } from '../../../../../services/authentication/authentication';


class SetScreenContainer extends React.Component {

    constructor() {
        super();

        this.state = [{ "loaded": false }];

        this.getSet = this.getSet.bind(this);
        this.removeCollection = this.removeCollection.bind(this);
        this.editCollection = this.editCollection.bind(this)

        this.functions = {
            removeCollection: this.removeCollection,
            editCollection: this.editCollection
        }
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
        return <View state={this.state} functions={this.functions}/>
    }
};

export default SetScreenContainer;