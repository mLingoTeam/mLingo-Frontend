import React from "react";
import LayoutUser from '../../layouts/LayoutUser'
import User_Create_Collection_Component from '../../components/account_/collection_/User_Create_Collection_Component'

class User_Create_Collection extends React.Component {


    render() {
        return (
            <LayoutUser>
                <User_Create_Collection_Component />
            </LayoutUser>
        )
    }
}

export default User_Create_Collection;