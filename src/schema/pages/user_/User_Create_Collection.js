import React from "react";
import LayoutUser from '../../layouts/LayoutUser'
import CollectionCreateContainer from '../../components/account_/collection_/CollectionCreate/CollectionCreateContainer'

class User_Create_Collection extends React.Component {

    render() {
        return (
            <LayoutUser>
                <CollectionCreateContainer />
            </LayoutUser>
        )
    }
}

export default User_Create_Collection;