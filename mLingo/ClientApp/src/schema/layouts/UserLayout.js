import React from 'react';
import AppNavbar from '../components/LayoutComponents/AppNavbar'
import Footer from '../components/LayoutComponents/Footer'
import UserMenu from '../components/UserBaseComponents/UserMenu';

const Layout = ({ children }) => {

    return (
        <div className="app--background">
            <AppNavbar />

            <main className="container user--container"> <UserMenu /> {children}</main>
            <Footer />
        </div>
    )
}

export default Layout;