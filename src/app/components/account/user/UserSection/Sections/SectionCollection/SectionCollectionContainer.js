import React from "react";
import { authentication_service } from "../../../../../../../services/authentication/authentication";
import handleResponse from '../../../../../../../services/handleResponse';
import View from './SectionCollectionView';
import { CURRENT_LOGGED_USER } from '../../../../../../../config/constants/localStorageConstants';

class SectionCollectionContainer extends React.Component {

    constructor(props) {
        super(props);

        this.state = { fields: [], exist: null, loading: true, type: 'username', request: localStorage.getItem(CURRENT_LOGGED_USER), collection_page: this.props.collection_page }
        this.findcollection = this.findcollection.bind(this);
    }

    async findcollection() {
        const collectiondata = await handleResponse({ request: authentication_service.collection.find({ type: this.state.type, name: this.state.request }) });

        if (collectiondata == false) {
            this.setState({ "fields": [], "exist": false, "loading": false });
        }
        else {
            this.setState({ "fields": collectiondata.response, "exist": true, "loading": false });
        }
    }

    componentDidMount() {
        this.findcollection();
    }

    render() {
        return <View state={this.state} />
    }
}

export default SectionCollectionContainer;