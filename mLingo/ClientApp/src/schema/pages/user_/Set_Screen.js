import React from "react";
import LayoutLandpage from '../../layouts/LayoutLandpage'
import LayoutUser from '../../layouts/LayoutUser'
import CollectionScreenContainer from '../../components/account_/collection_/CollectionScreen/CollectionScreenContainer'

class Set_Screen extends React.Component {

    constructor() {
        super();
        this.state = localStorage.getItem("currentUser") ? true : false;
    }
    render() {
        return (

            this.state ?
                <LayoutUser>
                    <CollectionScreenContainer />
                </LayoutUser> :
                <LayoutLandpage>
                    <CollectionScreenContainer />
                </LayoutLandpage>

        )
    }
}

export default Set_Screen;