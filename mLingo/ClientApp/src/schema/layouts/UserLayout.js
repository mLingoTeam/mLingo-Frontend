import React from 'react';
import AppNavbar from '../components/layout_components/AppNavbar'
import Footer from '../components/layout_components/Footer'
import UserMenu from '../components/user_components/UserMenu';

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