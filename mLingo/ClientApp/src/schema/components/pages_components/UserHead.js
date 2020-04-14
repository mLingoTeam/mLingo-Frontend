import React from "react";
import StudySetsSection from '../UserHeadComponents/Sections/StudySetsSection'
import CollectionSection from '../UserHeadComponents/Sections/CollectionSection'

class UserHead extends React.Component {
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
                    <StudySetsSection />
                    <CollectionSection />
                </div>
            </div>
        );
    }
}

export default UserHead;