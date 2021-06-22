import React, { Component } from "react";
import LayoutForms from '../../layouts/LayoutForms';

import FormpageLoginContainer from '../../components/landpage/formpage_/FormpageLogin/FormpageLoginContainer';
import { CURRENT_LOGGED_USER } from '../../../config/constants/localStorageConstants';

export default class Landpage_Login extends Component {

    render() {
        if (localStorage.getItem(CURRENT_LOGGED_USER)) {
            this.props.history.push('/head');
        }
        return (
            <LayoutForms>
                <FormpageLoginContainer />
            </LayoutForms>
        );
    }
}