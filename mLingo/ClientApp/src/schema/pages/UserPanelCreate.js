import React from "react";
import UserLayout from '../layouts/UserLayout'
import UserCreate from '../components/pages-components/UserCreate'

class UserPanelCreate extends React.Component {


    render() {
        return (
            <UserLayout>
                <UserCreate />
            </UserLayout>
        )
    }
}

export default UserPanelCreate;