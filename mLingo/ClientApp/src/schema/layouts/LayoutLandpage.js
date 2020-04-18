import React from 'react';
import LayoutNavbar from '../components/layout_/LayoutNavbar/LayoutNavbar'
import LayoutFooter from '../components/layout_/LayoutFooter/LayoutFooter'

const LayoutLandpage = ({ children }) => {


    return (
        <div className="app--background">
            <LayoutNavbar />
                <main className="container p-0">{children}</main>
            <LayoutFooter />
        </div>
    )
}

export default LayoutLandpage;