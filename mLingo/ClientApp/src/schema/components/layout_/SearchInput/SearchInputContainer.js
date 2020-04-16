import React from "react";
import { authentication_service } from '../../../../services/authentication';

import View from './SearchInputView'


class SearchInputContainer extends React.Component {
    constructor() {
        super();
        this.state = {
            request: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.findcollection = this.findcollection.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    findcollection() {
        authentication_service.setIntoLocalStorage({ name: 'request', value: this.state.request })
    }

    render() {
        return <View state={this.state}/>
    }
};

export default SearchInputContainer;