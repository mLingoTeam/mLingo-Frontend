import React from "react";
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { authenticationService } from '../../../../services/authentication';



class SearchInput extends React.Component {
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
        authenticationService.setIntoLocalStorage({ name: 'request', value: this.state.request })
    }

    render() {
        return <div><input type="text" className="searchbuttontext" name="request" onChange={this.handleChange} /><Link className="searchbutton" to="/search"><FaSearch onClick={this.findcollection} /></Link></div>
    }
};

export default SearchInput;