import React from "react";
import Container from "../../components/account/collection/CollectionLearn/Container.jsx";
import LayoutUser from '../../layouts/LayoutUser'

class User_Collection_Learn extends React.Component {

    constructor() {
        super();
    }
    render() {
        return (

            <LayoutUser>
                <Container />
            </LayoutUser>

        )
    }
}

export default User_Collection_Learn;