import React from "react";
import StudySetsSection from '../UserHeadComponents/Sections/StudySetsSection'
import Newsletter from '../LandPageComponents/Newsletter';

class UserHead extends React.Component {
    constructor(props) {
        super(props);

        if (localStorage.getItem("currentUser")) {
            this.props.history.push("/head");
        }
    }

    render() {
        return (
            <div>
                <div>
                    <h2 className="text-center pt-5 mt-5"> For this moment unavailable, but you can follow our newsletter and social media {":)"} </h2>
                </div>
                <Newsletter/>
            </div>
        );
    }
}

export default UserHead;