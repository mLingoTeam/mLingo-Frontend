import React from "react";
import UserPanelLayout from '../layouts/UserPanelLayout'
import UserCreate from '../UserPanelComponents/UserCreate'

class UserPanelCreate extends React.Component {


    render() {
        return (
            <UserPanelLayout>
                <UserCreate />
            </UserPanelLayout>
        )
    }
}

export default UserPanelCreate;