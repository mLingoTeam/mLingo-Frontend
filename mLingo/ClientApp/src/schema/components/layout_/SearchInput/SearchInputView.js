import React from "react";
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';



const SearchInputView = ( {state, functions} ) => {

    return <div><input type="text" className="searchbuttontext" name="request" onChange={functions.handleChange} /><Link className="searchbutton" to="/search"><FaSearch onClick={functions.findcollection} /></Link></div>
};

export default SearchInputView;