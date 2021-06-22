import React from "react";
import { authentication_service } from "../../../../../../../services/authentication/authentication";
import handleResponse from '../../../../../../../services/handleResponse';
import View from './SectionSetView';
import { CURRENT_LOGGED_USER } from '../../../../../../../config/constants/localStorageConstants';

class SectionSetContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = { fields: [], exist: null, loading: true, type: 'username', request: localStorage.getItem(CURRENT_LOGGED_USER) }

        this.findcollection = this.findcollection.bind(this);
    }

    async findcollection() {
        const setdata = await handleResponse({ request: authentication_service.set.find({ type: this.state.type, name: this.state.request }) });

        if (setdata == false) {
            this.setState({ "fields": [], "exist": false, "loading": false });
        }
        else {
            this.setState({ "fields": setdata.response, "exist": true, "loading": false });
        }
    }

    componentDidMount() {
        this.findcollection();
    }

    render() {
        return <View state={this.state} />
    }
}

export default SectionSetContainer;