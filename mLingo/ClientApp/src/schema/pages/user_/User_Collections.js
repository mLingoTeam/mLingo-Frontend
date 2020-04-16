import React from "react";
import UserSectionContainer from '../../components/account_/user_/UserSection/UserSectionContainer'
import LayoutUser from '../../layouts/LayoutUser'
import User_Collection_Section_Component from '../../components/account_/user_/Sections/User_Collection_Section_Component'

class User_Collection extends React.Component {

    constructor() {
        super();
    }
    render() {
        return (

                <LayoutUser>
                    <UserSectionContainer>
                        <User_Collection_Section_Component/>
                    </UserSectionContainer>
                </LayoutUser>

        )
    }
}

export default User_Collection;