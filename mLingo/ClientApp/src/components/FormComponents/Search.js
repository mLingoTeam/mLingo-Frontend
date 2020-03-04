import React from "react";
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Search = props => {
    return <div><input type="text" /><Link className="searchbutton" to="/search"><FaSearch /></Link></div>
};

export default Search;