import React from "react";
import LayoutLandpage from '../../layouts/LayoutLandpage'
import LayoutUser from '../../layouts/LayoutUser'
import SetScreenContainer from '../../components/account/set/SetCreate/SetScreenContainer'
import { CURRENT_LOGGED_USER } from '../../../config/constants/localStorageConstants';

function Set_Screen() {
    return (

        <React.Fragment>

            {
                Boolean(localStorage.getItem(CURRENT_LOGGED_USER)) ?
                    <LayoutUser>
                        <SetScreenContainer />
                    </LayoutUser> :
                    <LayoutLandpage>
                        <SetScreenContainer />
                    </LayoutLandpage>
            }


        </React.Fragment>

    )
}

export default Set_Screen;