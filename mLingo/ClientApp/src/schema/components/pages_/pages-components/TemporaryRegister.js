import React from "react";
import StudySetsSection from '../user_components/Sections/StudySetsSection'
import Newsletter from '../landpage_components/Newsletter';

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