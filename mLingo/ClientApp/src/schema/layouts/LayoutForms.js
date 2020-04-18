import React from 'react';
import LayoutNavbar from '../components/layout_/LayoutNavbar/LayoutNavbar'
import LayoutFooter from '../components/layout_/LayoutFooter/LayoutFooter'

const LayoutForms = ({ children }) => {


    return (
        <div className="app--background">
            <LayoutNavbar />
                <main className="container">{children}</main>
            <LayoutFooter />
        </div>
    )
}

export default LayoutForms;