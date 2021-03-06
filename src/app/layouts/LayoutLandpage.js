import React from 'react';
import LayoutNavbar from '../components/layout/LayoutNavbar/LayoutNavbar'
import LayoutFooter from '../components/layout/LayoutFooter/LayoutFooter'

const LayoutLandpage = ({ children }) => {


    return (
        <div className="app__background">
            <LayoutNavbar />
            <main className="container p-0">{children}</main>
            <LayoutFooter />
        </div>
    )
}

export default LayoutLandpage;