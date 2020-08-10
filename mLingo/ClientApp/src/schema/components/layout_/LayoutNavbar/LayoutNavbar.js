import React from "react";
import SearchInputContainer from '../SearchInput/SearchInputContainer';
import { Link } from "react-router-dom";
import logo from '../../../../img/Kompozycja 2.svg'
import LayoutUserMenu from '../LayoutUserMenu/LayoutUserMenu';
import { ReactComponent as Profile } from '../../../../img/icon-profile.svg'
import {authentication_service} from '../../../../services/authentication/authentication'

const logout = () => {
  authentication_service.user.logout();
  //it works because localStorage is empty imidiately
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
          <SearchInputContainer/>
          <Link to="/UserDashboard"><Profile className="ml-5"/></Link>
          <div>
            <button className="navbar__logoutbutton" onClick={logout}>log out</button>
          </div>
            <LayoutUserMenu navbar={true}/>
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
