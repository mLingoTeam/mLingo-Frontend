import React from "react";
import Layout from '../layouts/Layout'
import Collection from '../components/CardComponents/Collection'

class UserPanelCollection extends React.Component {


    render() {
        return (
            <Layout>
                <Collection />
            </Layout>
        )
    }
}

export default UserPanelCollection;