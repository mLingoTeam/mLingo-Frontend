import React, { Component } from "react";

import LayoutLandpage from '../../layouts/LayoutLandpage';

import MainpageNewsletterContainer from '../../components/landpage/mainpage_/MainpageNewsletter/MainpageNewsletterContainer';
import MainpageOpinions from '../../components/landpage/mainpage_/MainpageOpinions/MainpageOpinions';
import MainpageSteps from '../../components/landpage/mainpage_/MainpageSteps/MainpageSteps';
import MainpageWelcome from '../../components/landpage/mainpage_/MainpageWelcome/MainpageWelcome';
import { CURRENT_LOGGED_USER } from '../../../config/constants/localStorageConstants';

export default class Landpage extends Component {

  render() {
    if (localStorage.getItem(CURRENT_LOGGED_USER)) {
      this.props.history.push('/head');
    }
    return (
      <LayoutLandpage>
        <MainpageWelcome />
        <MainpageSteps />
        <MainpageOpinions />
        <MainpageNewsletterContainer />
      </LayoutLandpage>
    );
  }
}
