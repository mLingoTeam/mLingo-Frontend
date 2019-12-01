import React, { Component } from "react";
import AppNavbar from "./MainPageComponents/AppNavbar";
import Slider from "./MainPageComponents/Slider";

export default class MainPage extends Component {
  render() {
    return (
      <div>
        <AppNavbar />
        <Slider />
      </div>
    );
  }
}
