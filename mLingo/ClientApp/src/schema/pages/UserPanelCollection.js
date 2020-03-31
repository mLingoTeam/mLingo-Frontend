import React from "react";
import Layout from '../layouts/Layout'
import UserLayout from '../layouts/UserLayout'
import Collection from '../components/CardComponents/Collection'

class UserPanelCollection extends React.Component {

    constructor() {
        super();
        this.state = localStorage.getItem("currentUser") ? true : false;
    }
    render() {
        return (

            this.state ?
                <UserLayout>
                    <Collection />
                </UserLayout> :
                <Layout>
                    <Collection />
                </Layout>

        )
    }
}

export default UserPanelCollection;