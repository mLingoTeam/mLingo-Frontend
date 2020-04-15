import React from "react";
import User_Study_Sets_Section_Component from './Sections/User_Study_Sets_Section_Component'
import User_Collection_Section_Component from './Sections/User_Collection_Section_Component'

class User_Head_Component extends React.Component {
    constructor(props) {
        super(props);

        if (!localStorage.getItem("currentUser")) {
            this.props.history.push("/");
        }
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

export default User_Head_Component;