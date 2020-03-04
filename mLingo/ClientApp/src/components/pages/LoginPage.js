import React, { Component } from "react";
import Login from '../FormComponents/Login'

import Layout from '../layouts/Layout'

export default class LoginPage extends Component {

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