import React from "react";
import SectionSetContainer from '../UserSection/Sections/SectionSet/SectionSetContainer'
import SectionCollectionContainer from '../UserSection/Sections/SectionCollection/SectionCollectionContainer'

class UserHead extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="userhead__container">
                <div className="section__container">
                    <SectionCollectionContainer />
                    <SectionSetContainer />
                </div>
            </div>
        );
    }
}

export default UserHead;