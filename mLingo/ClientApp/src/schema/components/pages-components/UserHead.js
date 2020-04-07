import React from "react";
import StudySetsSection from '../UserBaseComponents/Sections/StudySetsSection'
import CollectionSection from '../UserBaseComponents/Sections/CollectionSection'

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