import React from "react";
import { Navbar, NavbarBrand, Button } from "reactstrap";
import { Link } from "react-router-dom";
import brandIcon from "../../img/monkey.png";
import Formular from "./Formular";
import "./AppNavbar.css";

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
        <a href="#Username2">
          <Button className="d-none d-lg-block register-button">
            Register
          </Button>
        </a>
      </Navbar>
    </div>
  );
};

export default AppNavbar;
