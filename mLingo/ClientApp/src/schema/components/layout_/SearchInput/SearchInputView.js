import React from "react";
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';



const SearchInputView = ( {state} ) => {

    return <div><input type="text" className="searchbuttontext" name="request" onChange={state.handleChange} /><Link className="searchbutton" to="/search"><FaSearch onClick={state.findcollection} /></Link></div>
};

export default SearchInputView;