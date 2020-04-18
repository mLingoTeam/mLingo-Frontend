import React, { Component } from "react";
import LayoutForms from '../../layouts/LayoutForms';

import FormpageLoginContainer from '../../components/landpage_/formpage_/FormpageLogin/FormpageLoginContainer';

export default class Landpage_Login extends Component {

    render() {
        if (localStorage.getItem("currentUser")) {
            this.props.history.push('/head');
        }
        return (
            <LayoutForms>
                <FormpageLoginContainer />
            </LayoutForms>
        );
    }
}