import React from "react";
import User_Collection_Section_Component from '../UserSection/Sections/CollectionSection/User_Collection_Section_Component'

class UserHead extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="mainpanel">
                <div className="mainpanel__userbase">
                    <User_Collection_Section_Component />
                </div>
            </div>
        );
    }
}

export default UserHead;