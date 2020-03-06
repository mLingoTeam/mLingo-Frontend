import React from 'react';
import AppNavbar from '../MainPageComponents/AppNavbar'
import Footer from '../MainPageComponents/Footer'

const Layout = ({ children }) => {

    return (
        <div className="app--background">
            <AppNavbar />
            <main className="container">{children}</main>
            <Footer />
        </div>
    )
}

export default Layout;