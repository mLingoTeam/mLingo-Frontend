import React from "react";
import Layout from '../layouts/Layout'
import Search from '../components/pages-components/Search'

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