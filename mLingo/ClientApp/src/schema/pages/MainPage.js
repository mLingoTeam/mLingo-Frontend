import React, { Component } from "react";
import WelcomeSection from '../components/LandPageComponents/WelcomeSection'

import Layout from '../layouts/LandpageLayout'
import Newsletter from "../components/LandPageComponents/Newsletter";
import Steps from '../components/LandPageComponents/Steps';
import Opinions from '../components/LandPageComponents/Opinions';

export default class MainPage extends Component {

  render() {
    if (localStorage.getItem("currentUser")) {
      this.props.history.push('/head');
    }
    return (
      <Layout>
        <WelcomeSection />
        <Steps/>
        <Opinions/>
        <Newsletter/>
      </Layout>
    );
  }
}
