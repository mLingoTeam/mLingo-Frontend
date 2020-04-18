import React from "react";

import View from './SearchInputView'


class SearchInputContainer extends React.Component {
    constructor() {
        super();
        this.state = {
            request: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.findcollection = this.findcollection.bind(this);

        this.functions = {
            handleChange: this.handleChange,
            findcollection: this.findcollection
        }
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    findcollection() {
        localStorage.setItem( 'request', this.state.request )
    }

    render() {
        return <View state={this.state} functions={this.functions}/>
    }
};

export default SearchInputContainer;