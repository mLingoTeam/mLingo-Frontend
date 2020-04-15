import React from "react";
import User_Layout from '../layouts/User_Layout'
import User_Create_Collection_Component from '../components/user_/user_components/User_Create_Collection_Component'

class User_Create_Collection extends React.Component {


    render() {
        return (
            <User_Layout>
                <User_Create_Collection_Component />
            </User_Layout>
        )
    }
}

export default User_Create_Collection;