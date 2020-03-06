import React from "react";
import Layout from '../layouts/Layout'
import UserCreate from '../UserPanelComponents/UserCreate'

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