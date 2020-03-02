import React from 'react';

const UserPanelLayout = ({ children }) => {

    return (
        <div>
            <header>Hey</header>
            <main>{children}</main>
        </div>
    )
}

export default UserPanelLayout;