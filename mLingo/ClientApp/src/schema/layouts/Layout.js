import React from 'react';
import AppNavbar from '../components/LayoutComponents/AppNavbar'
import Footer from '../components/LayoutComponents/Footer'

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