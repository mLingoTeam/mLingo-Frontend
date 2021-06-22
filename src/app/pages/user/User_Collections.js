import React from "react";
import LayoutUser from '../../layouts/LayoutUser'
import SectionCollectionContainer from '../../components/account/user/UserSection/Sections/SectionCollection/SectionCollectionContainer'

function User_Collection() {
    return (
        <LayoutUser>
            <SectionCollectionContainer collection_page={true} />
        </LayoutUser>

    )
}

export default User_Collection;