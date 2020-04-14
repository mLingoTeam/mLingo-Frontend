import React from "react";
import Layout from '../layouts/Layout'
import UserLayout from '../layouts/User_Layout'
import Collection from '../components/user_/collection_/collection_components/Collection'

class Collection_Screen extends React.Component {

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

export default Collection_Screen;