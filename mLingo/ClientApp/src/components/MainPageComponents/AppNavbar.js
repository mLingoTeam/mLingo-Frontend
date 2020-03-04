import React from "react";
import { Link } from "react-router-dom";
import SignInModal from "./SignInModal";

const AppNavbar = props => {
  return (
    <div className="navbar--dark">
      <Link className="navbar__brand" to="/">
        <p className="navbar__brand--text">mLingo</p>
      </Link>
      <div className="navbar__buttons">
        <input type="text" />
        <SignInModal />
        <div>
          <button className="navbar__registerbutton">sign up</button>
        </div>
      </div>
    </div>
  );
};

export default AppNavbar;
