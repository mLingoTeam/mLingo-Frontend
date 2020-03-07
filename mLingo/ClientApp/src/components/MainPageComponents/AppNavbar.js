import React from "react";
import SearchInput from '../FormComponents/SearchInput';
import { Link } from "react-router-dom";
import logo from '../../img/Kompozycja 2.svg'
import { authenticationService } from "../../services/authentication";

const logout = () => {
  authenticationService.logout();
  //it works because localStorage is empty imidiately
  window.location.reload();
};

const AppNavbar = props => {
  return (
    <div className="navbar--dark">
      <Link className="navbar__brand" to="/">
        <img src={logo} className="img-fluid" />
      </Link>
      <div className="navbar__buttons">
        <SearchInput />
        {
          localStorage.getItem("currentUser") ? <div className="navbar__buttons">
            <div>
              <Link className="signinbutton" to="/head">learn</Link>
            </div>
            <div>
              <button className="navbar__registerbutton" onClick={logout} >logout</button>
            </div>
          </div> : <div className="navbar__buttons"> <div>
            <Link className="signinbutton" to="/Login">sign in</Link>
          </div>
              <div>
                <Link className="navbar__registerbutton" to="/Register">sign up</Link>
              </div>
            </div>
        }
      </div>
    </div >
  );
};

export default AppNavbar;
