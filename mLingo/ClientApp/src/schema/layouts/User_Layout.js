import React from 'react';
import Layout from './Layout'
import User_Menu from '../components/layout_/user_layout_components/User_Menu';

const User_Layout = ({ children }) => {

    return (
        <Layout>
            <User_Menu />
            {children}
        </Layout>
    )
}

export default User_Layout;