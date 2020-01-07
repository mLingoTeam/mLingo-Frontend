import React, { Component } from "react";
import AppNavbar from "./MainPageComponents/AppNavbar";
import Slider from "./MainPageComponents/Slider";
import Promo from "./MainPageComponents/Promo";
import UserPromo from "./MainPageComponents/UserPromo";
import Register from "./FormComponents/Register";
import Footer from "./MainPageComponents/Footer";
import "./styles/css/Main.css";

export default class MainPage extends Component {

  render() {
    if (localStorage.getItem("currentUser")) {
      this.props.history.push('/login');
    }
    return (
      <div>
        <AppNavbar />

        <Promo />
        <UserPromo />
        <Register />
        <Footer />
      </div>
    );
  }
}
