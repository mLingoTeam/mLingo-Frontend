import React from "react";
import UserSectionContainer from '../../components/account_/user_/UserSection/UserSectionContainer'
import LayoutUser from '../../layouts/LayoutUser'
import SectionCollectionContainer from '../../components/account_/user_/UserSection/Sections/SectionCollection/SectionCollectionContainer'

class User_Collection extends React.Component {

    constructor() {
        super();
    }
    render() {
        return (

                <LayoutUser>
                        <SectionCollectionContainer collection_page={true}/>
                </LayoutUser>

        )
    }
}

export default User_Collection;