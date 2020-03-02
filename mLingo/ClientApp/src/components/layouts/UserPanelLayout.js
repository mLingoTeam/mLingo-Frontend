import React from 'react';
import UserNavbar from '../UserPanelComponents/UserNavbar'

const UserPanelLayout = ({ children }) => {

    return (
        <div>
            <UserNavbar />
            <main>{children}</main>
        </div>
    )
}

export default UserPanelLayout;