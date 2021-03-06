import React from 'react';
import LayoutNavbar from '../components/layout/LayoutNavbar/LayoutNavbar'
import LayoutFooter from '../components/layout/LayoutFooter/LayoutFooter'

const LayoutForms = ({ children }) => {


    return (
        <div className="app__background">
            <LayoutNavbar />
            <main className="container">{children}</main>
            <LayoutFooter />
        </div>
    )
}

export default LayoutForms;