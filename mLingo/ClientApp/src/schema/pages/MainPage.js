import React, { Component } from "react";
import Promo from "../components/LandPageComponents/Promo";
import Register from "../components/FormComponents/Register";
import WelcomeSection from '../components/LandPageComponents/WelcomeSection'

import Layout from '../layouts/LandpageLayout'
import Newsletter from "../components/LandPageComponents/Newsletter";

export default class MainPage extends Component {

  render() {
    if (localStorage.getItem("currentUser")) {
      this.props.history.push('/head');
    }
    return (
      <Layout>
        <WelcomeSection />
        <Register />
        <Newsletter/>
      </Layout>
    );
  }
}
