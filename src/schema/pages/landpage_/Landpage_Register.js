import React, { Component } from "react";
import LayoutForms from '../../layouts/LayoutForms';
import FormpageRegisterContainer from '../../components/landpage_/formpage_/FormpageRegister/FormpageRegisterContainer';

export default class Landpage_Register extends Component {

    render() {
        if (localStorage.getItem("currentUser")) {
            this.props.history.push('/head');
        }
        return (
            <LayoutForms>
                <FormpageRegisterContainer />
            </LayoutForms>
        );
    }
}