import React from "react";
import SearchInput from '../FormComponents/SearchInput';
import { Link } from "react-router-dom";
import logo from '../../img/Kompozycja 2.svg'

const AppNavbar = props => {
  return (
    <div className="navbar--dark container">
      <Link className="navbar__brand" to="/">
        <img src={logo} className="img-fluid" />
      </Link>
      <div className="navbar__buttons">
        <SearchInput />
        <div>
          <Link className="signinbutton" to="/Login">sign in</Link>
        </div>
        <div>
          <Link className="navbar__registerbutton" to="/Register">sign up</Link>
        </div>
      </div>
    </div>
  );
};

export default AppNavbar;
