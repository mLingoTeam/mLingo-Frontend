import React from "react";
import User_Section_Component from '../components/user_/user_components/User_Section_Component'
import User_Layout from '../layouts/User_Layout'
import User_Collection_Section_Component from '../components/user_/user_components/Sections/User_Collection_Section_Component'

class User_Collection extends React.Component {

    constructor() {
        super();
    }
    render() {
        return (

                <User_Layout>
                    <User_Section_Component>
                        <User_Collection_Section_Component/>
                    </User_Section_Component>
                </User_Layout>

        )
    }
}

export default User_Collection;