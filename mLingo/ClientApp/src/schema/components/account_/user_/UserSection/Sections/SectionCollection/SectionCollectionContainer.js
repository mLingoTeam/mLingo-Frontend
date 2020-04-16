import React from "react";
import { authentication_service } from "../../../../../../../services/authentication/authentication";
import View from './SectionCollectionView';

class User_Collection_Section_Component extends React.Component {

    constructor(props) {
        super(props);

        this.state = { fields: [], exist: null, loading: true, type: 'username', request: localStorage.getItem("currentUser") }

        this.findcollection = this.findcollection.bind(this);
    }

    async findcollection() {
        const collectiondata = await authentication_service.collection.find({type: this.state.type, name: this.state.request});

        if (collectiondata.successful === true) {
            this.setState({ "fields": collectiondata.response, "exist": true, "loading": false });
        }
        else {
            this.setState({ "fields": [], "exist": false, "loading": false });
        }
    }

    componentDidMount() {
        this.findcollection();
    }

    render() {
        return <View that={this.state} />
    }
}

export default User_Collection_Section_Component;