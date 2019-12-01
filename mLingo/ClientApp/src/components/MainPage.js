import React, { Component } from "react";
import AppNavbar from "./MainPageComponents/AppNavbar";
import Slider from "./MainPageComponents/Slider";
import Promo from "./MainPageComponents/Promo";
import UserPromo from "./MainPageComponents/UserPromo";

export default class MainPage extends Component {
  render() {
    return (
      <div>
        <AppNavbar />
        <Slider />
        <Promo />
        <UserPromo />
      </div>
    );
  }
}
