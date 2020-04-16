import React from "react";

import { authentication_service } from "../../../../../services/authentication/authentication";
import View from './CollectionSearchView'

class Collection_Search_Component extends React.Component {
    constructor(props) {
        super(props);

        this.state = { fields: [], exist: null, type: 'name', request: localStorage.getItem("request") }

        this.findcollection = this.findcollection.bind(this);
        this.changeRequest = this.changeRequest.bind(this);
        this.changeRequestType = this.changeRequestType.bind(this);

    }

    changeRequest(event) {
        this.setState({ "request": event.target.value });
    }
    changeRequestType(event) {
        this.setState({ "type": event.target.value });
    }


    async findcollection() {
        const collectiondata = await authentication_service.collection.find({type: this.state.type, name: this.state.request});

        if (collectiondata.successful === true) {
            this.setState({ "fields": collectiondata.response, "exist": true });
        }
        else {
            console.log("false")
            this.setState({ "fields": [], "exist": false });
        }
    }

    componentDidMount() {
        this.findcollection();
    }

    render() {
        return <View that={this.state} />
    }
}

export default Collection_Search_Component;