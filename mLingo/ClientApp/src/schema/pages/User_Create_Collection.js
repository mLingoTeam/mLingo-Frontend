import React from "react";
import UserLayout from '../layouts/UserLayout'
import UserCreate from '../components/pages_components/UserCreate'

class User_Create_Collection extends React.Component {


    render() {
        return (
            <UserLayout>
                <UserCreate />
            </UserLayout>
        )
    }
}

export default User_Create_Collection;