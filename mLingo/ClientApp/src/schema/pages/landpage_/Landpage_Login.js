import React, { Component } from "react";
import Layout from '../layouts/Layout';

import Form_Login from '../components/landpage_/form_components/Form_Login';

export default class Landpage_Login extends Component {

    render() {
        if (localStorage.getItem("currentUser")) {
            this.props.history.push('/head');
        }
        return (
            <Layout>
                <Form_Login />
            </Layout>
        );
    }
}