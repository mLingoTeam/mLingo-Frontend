import React from "react";
import StudySetsSection from '../UserBaseComponents/Sections/StudySetsSection'

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
                        <StudySetsSection />
                        <StudySetsSection />
                        <StudySetsSection />
                    </div>
                </div>
            </div >
        );
    }
}

export default UserHead;