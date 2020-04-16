import React from "react";
import LayoutLandpage from '../../layouts/LayoutLandpage';
import Temporary_Register_Component from '../../components/landpage_/mainpage_/TemporaryRegister';

class Temporary_Register extends React.Component {


    render() {
        return (
            <LayoutLandpage>
                <Temporary_Register_Component history={this.props.history}/>
            </LayoutLandpage>
        )
    }
}

export default Temporary_Register;