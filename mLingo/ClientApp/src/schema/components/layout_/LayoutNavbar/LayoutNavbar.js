import React from "react";
import SearchInputContainer from '../SearchInput/SearchInputContainer';
import { Link } from "react-router-dom";
import logo from '../../../../img/Kompozycja 2.svg'
import { authentication_service } from "../../../../services/authentication/authentication";
import LayoutUserMenu from '../LayoutUserMenu/LayoutUserMenu';

const logout = () => {
  authentication_service.user.logout();
  window.location.reload();
};

const LayoutNavbar = props => {
  return (
    <div className="app__navbar">
      <Link className="navbar__brand" to="/">
        <img src={logo} className="brand__img" />
      </Link>
        {
          localStorage.getItem("currentUser") ? <div className="navbar__buttons">
          <SearchInputContainer />
            <LayoutUserMenu/>
          </div> : <div className="navbar__buttons">
          <div>
            <SearchInputContainer />
          </div>
          <div>
            <Link className="signin__button" to="/Login">sign in</Link>
          </div>
              <div>
                <Link className="navbar__registerbutton" to="/Register">sign up</Link>
              </div>
            </div>
        }
    </div >
  );
};

export default LayoutNavbar;
