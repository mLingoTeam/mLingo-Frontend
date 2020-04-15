import React from 'react';
import User_Menu from '../components/layout_/user_layout_components/User_Menu';
import Layout_Navbar from '../components/layout_/layout_components/Layout_Navbar'
import Layout_Footer from '../components/layout_/layout_components/Layout_Footer'

const User_Layout = ({ children }) => {

    return (
        <div className="app--background">
            <Layout_Navbar />
                <main className="container user--container"> <User_Menu /> {children}</main>
            <Layout_Footer />
        </div>
    )
}

export default User_Layout;