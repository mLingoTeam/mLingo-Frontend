import React from "react";
import StudySetsSection from '../user_components/Sections/StudySetsSection'
import CollectionSection from '../user_components/Sections/CollectionSection'

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
                    <StudySetsSection />
                    <CollectionSection />
                </div>
            </div>
        );
    }
}

export default User_Head_Component;