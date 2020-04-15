import React from 'react';
import LayoutUserMenu from '../components/layout_/LayoutUserMenu/LayoutUserMenu';
import LayoutNavbar from '../components/layout_/LayoutNavbar/LayoutNavbar'
import LayoutFooter from '../components/layout_/LayoutFooter/LayoutFooter'

const UserLayout = ({ children }) => {

    return (
        <div className="app--background">
            <LayoutNavbar />
                <main className="container user--container"> <LayoutUserMenu /> {children}</main>
            <LayoutFooter />
        </div>
    )
}

export default UserLayout;