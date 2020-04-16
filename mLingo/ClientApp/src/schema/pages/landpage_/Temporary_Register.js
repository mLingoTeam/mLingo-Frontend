import React from "react";
import Layout from '../layouts/Layout'
import Temporary_Register_Component from '../../components/landpage_/Temporary_Register_Component'

class Temporary_Register extends React.Component {


    render() {
        return (
            <Layout>
                <Temporary_Register_Component history={this.props.history}/>
            </Layout>
        )
    }
}

export default Temporary_Register;