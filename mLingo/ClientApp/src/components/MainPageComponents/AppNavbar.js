import React from "react";
import { Link } from "react-router-dom";

const AppNavbar = props => {
  return (
    <div className="navbar--dark">
      <Link className="navbar__brand" to="/">
        <p className="navbar__brand--text">mLingo</p>
      </Link>
      <div className="navbar__buttons">
        <input type="text" />
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
