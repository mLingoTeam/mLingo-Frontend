import React from 'react';
import Layout from './Layout'
import UserMenu from '../components/user_components/UserMenu';

const User_Layout = ({ children }) => {

    return (
        <Layout>
            <UserMenu />
            {children}
        </Layout>
    )
}

export default User_Layout;