import React from 'react';
import AppNavbar from '../components/layout_components/AppNavbar'
import Footer from '../components/layout_components/Footer'

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