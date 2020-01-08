import React from "react";
import { Link } from "react-router-dom";
import SignInModal from "./SignInModal";
import brandIcon from "../../img/monkey.png";

const AppNavbar = props => {
  return (
    <div className="navbar--dark">
      <nav
        className="navbar navbar-expand-sm navbar-toggleable-sm ng-white box-shadow navbar-light bg-faded"
      >
        <a className="navbar__brand" tag={Link} to="/">
          {" "}
          <img alt="brand--icon" src={brandIcon} className="navbar__brand--icon" />
          <p className="navbar__brand--text">mLingo</p>
        </a>
        <div className="d-none d-lg-block navbar__buttons">
          <SignInModal />
          <div>
            <a href="#Username">
              <button className="navbar__registerbutton">Register</button>
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default AppNavbar;
