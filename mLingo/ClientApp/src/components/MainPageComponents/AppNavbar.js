import React from "react";
import { Navbar, NavbarBrand } from "reactstrap";
import { Link } from "react-router-dom";
import brandIcon from "../../img/monkey.png";

const AppNavbar = props => {
  return (
    <div className="navbar-dark">
      <Navbar
        color="faded"
        light
        className="navbar navbar-expand-sm navbar-toggleable-sm ng-white box-shadow"
      >
        <NavbarBrand tag={Link} to="/">
          {" "}
          <img alt="brand-icon" src={brandIcon} className="brand-icon" />
          <p className="brand-text">mLingo</p>
        </NavbarBrand>
        <div className="d-none d-lg-block navbar-buttons">
          <button className="sign-in-button">Sign in</button>
          <a href="#Username2">
            <button className="register-button">Register</button>
          </a>
        </div>
      </Navbar>
    </div>
  );
};

export default AppNavbar;
