import React from 'react';
import LayoutUserMenu from '../components/layout/LayoutUserMenu/LayoutUserMenu';
import LayoutNavbar from '../components/layout/LayoutNavbar/LayoutNavbar'
import LayoutFooter from '../components/layout/LayoutFooter/LayoutFooter'

const UserLayout = ({ children }) => {

    return (
        <div className="app__background">
            <LayoutNavbar />
            <main className="container user--container"> <LayoutUserMenu /> {children}</main>
            <LayoutFooter />
        </div>
    )
}

export default UserLayout;