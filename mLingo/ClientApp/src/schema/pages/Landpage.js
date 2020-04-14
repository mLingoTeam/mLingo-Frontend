import React, { Component } from "react";
import WelcomeSection from '../components/landpage_components/WelcomeSection'

import Layout from '../layouts/LandpageLayout'
import Newsletter from "../components/landpage_components/Newsletter";
import Steps from '../components/landpage_components/Steps';
import Opinions from '../components/landpage_components/Opinions';

export default class Landpage extends Component {

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
