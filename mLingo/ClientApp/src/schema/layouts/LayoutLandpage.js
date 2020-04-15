import React from 'react';
import Layout_Navbar from '../components/layout_/layout_components/Layout_Navbar'
import Layout_Footer from '../components/layout_/layout_components/Layout_Footer'

const Layout = ({ children }) => {


    return (
        <div className="app--background">
            <Layout_Navbar />
                <main className="container">{children}</main>
            <Layout_Footer />
        </div>
    )
}

export default Layout;