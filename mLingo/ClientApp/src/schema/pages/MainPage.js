import React, { Component } from "react";
import Promo from "../components/LandPageComponents/Promo";
import Register from "../components/FormComponents/Register";

import Layout from '../layouts/Layout'

export default class MainPage extends Component {

  render() {
    if (localStorage.getItem("currentUser")) {
      this.props.history.push('/head');
    }
    return (
      <Layout>
        <Promo />
        <Register />
      </Layout>
    );
  }
}
