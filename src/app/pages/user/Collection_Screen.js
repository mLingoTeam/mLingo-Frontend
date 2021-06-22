import React from "react";
import LayoutLandpage from '../../layouts/LayoutLandpage'
import LayoutUser from '../../layouts/LayoutUser'
import CollectionScreenContainer from '../../components/account/collection/CollectionScreen/CollectionScreenContainer'
import { CURRENT_LOGGED_USER } from '../../../config/constants/localStorageConstants';

function Collection_Screen() {

    return (

        <React.Fragment>
            {
                Boolean(localStorage.getItem(CURRENT_LOGGED_USER)) ?
                    <LayoutUser>
                        <CollectionScreenContainer />
                    </LayoutUser> :
                    <LayoutLandpage>
                        <CollectionScreenContainer />
                    </LayoutLandpage>
            }
        </React.Fragment>


    )

}

export default Collection_Screen;