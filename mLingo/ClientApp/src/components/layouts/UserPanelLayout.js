import React from 'react';
import UserNavbar from '../UserPanelComponents/UserNavbar'
import Footer from '../MainPageComponents/Footer'

const UserPanelLayout = ({ children }) => {

    return (
        <div className="app--background">
            <UserNavbar />
            <main className="container">{children}</main>
            <Footer />
        </div>
    )
}

export default UserPanelLayout;
