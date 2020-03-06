import React, { Component } from "react";
import Promo from "../MainPageComponents/Promo";
import Register from "../FormComponents/Register";
import "../styles/css/Main.css";

import Layout from '../layouts/Layout'

export default class MainPage extends Component {

  render() {
    if (localStorage.getItem("currentUser")) {
      this.props.history.push('/login');
    }
    return (
      <Layout>
        <Promo />
        <Register />
      </Layout>
    );
  }
}
