import React from "react";
import UserPanelLayout from '../layouts/UserPanelLayout'
import Collection from '../UserPanelComponents/Collection'

class UserPanelCollection extends React.Component {


    render() {
        return (
            <UserPanelLayout>
                <Collection />
            </UserPanelLayout>
        )
    }
}

export default UserPanelCollection;