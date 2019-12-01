import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
import { Link } from "react-router-dom";
import brandIcon from "../img/monkey.png";
import "./AppNavbar.css";

const AppNavbar = props => {
  // Hooks
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <div>
      <Navbar
        color="faded"
        light
        className="navbar navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow"
      >
        <NavbarBrand tag={Link} to="/">
          {" "}
          <img alt="brand-icon" src={brandIcon} className="brand-icon" />
          <p className="brand-text">mLingo</p>
        </NavbarBrand>
      </Navbar>
    </div>
  );
};

export default AppNavbar;
