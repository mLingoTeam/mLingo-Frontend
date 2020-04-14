import React, { Component } from "react";
import Login from '../components/form_components/Login'

import Layout from '../layouts/Layout'

export default class Landpage_Login extends Component {

    render() {
        if (localStorage.getItem("currentUser")) {
            this.props.history.push('/head');
        }
        return (
            <Layout>
                <Login />
            </Layout>
        );
    }
}