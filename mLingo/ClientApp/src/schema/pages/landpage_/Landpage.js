import React, { Component } from "react";

import Layout from '../layouts/Layout'

import MainpageWelcome from '../../components/landpage_/mainpage_/MainpageNewsletter/MainpageWelcome'
//import Landpage_Newsletter from "../components/landpage_/landpage_components/Landpage_Newsletter";
//import Landpage_Steps from '../components/landpage_/landpage_components/Landpage_Steps';
//import Landpage_Opinions from '../components/landpage_/landpage_components/Landpage_Opinions';

export default class Landpage extends Component {

  render() {
    if (localStorage.getItem("currentUser")) {
      this.props.history.push('/head');
    }
    return (
      <Layout>
        <MainpageWelcome />
      </Layout>
    );
  }
}
