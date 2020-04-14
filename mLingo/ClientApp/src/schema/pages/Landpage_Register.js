import React, { Component } from "react";
import Register from '../components/form_components/Register'

import Layout from '../layouts/Layout'

export default class Landpage_Register extends Component {

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