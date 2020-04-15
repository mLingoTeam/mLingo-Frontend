import React from "react";
import User_Study_Sets_Section_Component from './Sections/User_Study_Sets_Section_Component'
import User_Collection_Section_Component from '../UserSection/Sections/CollectionSection/User_Collection_Section_Component'

class UserHead extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="mainpanel">
                <div className="mainpanel__userbase">
                    <User_Study_Sets_Section_Component />
                    <User_Collection_Section_Component />
                </div>
            </div>
        );
    }
}

export default UserHead;