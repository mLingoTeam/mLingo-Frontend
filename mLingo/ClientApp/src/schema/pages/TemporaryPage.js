import React from "react";
import Layout from '../layouts/Layout'
import TemporaryRegister from '../components/pages-components/TemporaryRegister'

class UserPanel extends React.Component {


    render() {
        return (
            <Layout>
                <TemporaryRegister history={this.props.history}/>
            </Layout>
        )
    }
}

export default UserPanel;