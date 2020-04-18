import React, { Component } from "react";

import LayoutLandpage from '../../layouts/LayoutLandpage';

import MainpageNewsletterContainer from '../../components/landpage_/mainpage_/MainpageNewsletter/MainpageNewsletterContainer';
import MainpageOpinions from '../../components/landpage_/mainpage_/MainpageOpinions/MainpageOpinions';
import MainpageSteps from '../../components/landpage_/mainpage_/MainpageSteps/MainpageSteps';
import MainpageWelcome from '../../components/landpage_/mainpage_/MainpageWelcome/MainpageWelcome'

export default class Landpage extends Component {

  render() {
    if (localStorage.getItem("currentUser")) {
      this.props.history.push('/head');
    }
    return (
      <LayoutLandpage>
        <MainpageWelcome/>
        <MainpageSteps/>
        <MainpageOpinions/>
        <MainpageNewsletterContainer />
      </LayoutLandpage>
    );
  }
}
