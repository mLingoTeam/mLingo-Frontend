import React from "react";
import Layout from '../layouts/Layout'
import Search from '../CollectionComponents/Search'

class UserPanel extends React.Component {


    render() {
        return (
            <Layout>
                <Search />
            </Layout>
        )
    }
}

export default UserPanel;