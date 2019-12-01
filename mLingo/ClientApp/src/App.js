import React, { Component } from "react";
import AppNavbar from "./components/AppNavbar";
import Slider from "./components/Slider";

export default class App extends Component {
  render() {
    return (
      <div>
        <AppNavbar />
        <Slider />
      </div>
    );
  }
}
