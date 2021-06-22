import React, { Component } from "react";
import LayoutForms from '../../layouts/LayoutForms';
import FormpageRegisterContainer from '../../components/landpage/formpage_/FormpageRegister/FormpageRegisterContainer';
import { CURRENT_LOGGED_USER } from '../../../config/constants/localStorageConstants';

export default class Landpage_Register extends Component {

    render() {
        if (localStorage.getItem(CURRENT_LOGGED_USER)) {
            this.props.history.push('/head');
        }
        return (
            <LayoutForms>
                <FormpageRegisterContainer />
            </LayoutForms>
        );
    }
}