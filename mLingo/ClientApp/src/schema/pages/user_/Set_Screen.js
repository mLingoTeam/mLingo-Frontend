import React from "react";
import LayoutLandpage from '../../layouts/LayoutLandpage'
import LayoutUser from '../../layouts/LayoutUser'
import SetScreenContainer from '../../components/account_/set_/SetCreate/SetScreenContainer'

class Set_Screen extends React.Component {

    constructor() {
        super();
        this.state = localStorage.getItem("currentUser") ? true : false;
    }
    render() {
        return (

            this.state ?
                <LayoutUser>
                    <SetScreenContainer />
                </LayoutUser> :
                <LayoutLandpage>
                    <SetScreenContainer />
                </LayoutLandpage>

        )
    }
}

export default Set_Screen;