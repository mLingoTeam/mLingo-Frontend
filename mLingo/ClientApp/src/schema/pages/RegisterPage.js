import React, { Component } from "react";
import Register from '../components/FormComponents/Register'

import Layout from '../layouts/Layout'

export default class RegisterPage extends Component {

    render() {
        if (localStorage.getItem("currentUser")) {
            this.props.history.push('/head');
        }
        return (
            <Layout>
                <Register />
            </Layout>
        );
    }
}