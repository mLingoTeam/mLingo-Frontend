import React from "react";
import Layout from '../layouts/Layout'
import TemporaryRegister from '../components/pages-components/TemporaryRegister'

class Temporary_Register extends React.Component {


    render() {
        return (
            <Layout>
                <TemporaryRegister history={this.props.history}/>
            </Layout>
        )
    }
}

export default Temporary_Register;