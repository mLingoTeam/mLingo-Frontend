import React from "react";
import Layout from '../layouts/Layout'
import UserCreate from '../components/pages-components/UserCreate'

class UserPanelCreate extends React.Component {


    render() {
        return (
            <Layout>
                <UserCreate />
            </Layout>
        )
    }
}

export default UserPanelCreate;