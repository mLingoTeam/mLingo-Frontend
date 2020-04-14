import React, { Component } from "react";

import Form_Register from '../components/landpage_/form_components/Form_Register'

import Layout from '../layouts/Layout'

export default class Landpage_Register extends Component {

    render() {
        if (localStorage.getItem("currentUser")) {
            this.props.history.push('/head');
        }
        return (
            <Layout>
                <Form_Register />
            </Layout>
        );
    }
}