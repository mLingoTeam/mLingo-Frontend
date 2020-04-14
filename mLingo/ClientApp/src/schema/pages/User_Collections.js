import React from "react";
import UserSection from '../components/UserHeadComponents/UserSection'
import UserLayout from '../layouts/UserLayout'
import Collectionscontent from '../components/UserHeadComponents/PagesContent/CollectionsContent'

class User_Collection extends React.Component {

    constructor() {
        super();
    }
    render() {
        return (

                <UserLayout>
                    <UserSection>
                        <Collectionscontent/>
                    </UserSection>
                </UserLayout>

        )
    }
}

export default User_Collection;