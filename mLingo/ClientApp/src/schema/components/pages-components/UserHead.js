import React from "react";
import UserSection from '../UserBaseComponents/UserSection';

class UserHead extends React.Component {
    constructor(props) {
        super(props);

        if (!localStorage.getItem("currentUser")) {
            this.props.history.push("/");
        }
    }

    render() {
        return (
            <div>
                <div className="mainpanel">
                    <div className="mainpanel__userbase">
                        <UserSection />
                    </div>
                </div>
            </div >
        );
    }
}

export default UserHead;