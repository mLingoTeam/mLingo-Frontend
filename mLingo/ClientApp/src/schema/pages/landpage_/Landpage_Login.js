import React, { Component } from "react";
import LayoutLandpage from '../../layouts/LayoutLandpage';

import FormpageLoginContainer from '../../components/landpage_/formpage_/FormpageLogin/FormpageLoginContainer';

export default class Landpage_Login extends Component {

    render() {
        if (localStorage.getItem("currentUser")) {
            this.props.history.push('/head');
        }
        return (
            <LayoutLandpage>
                <FormpageLoginContainer />
            </LayoutLandpage>
        );
    }
}