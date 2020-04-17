import React from "react";
import SectionSetContainer from '../UserSection/Sections/SectionSet/SectionSetContainer'
import SectionCollectionContainer from '../UserSection/Sections/SectionCollection/SectionCollectionContainer'

class UserHead extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="mainpanel">
                <div className="mainpanel__userbase">
                    <SectionSetContainer />
                    <SectionCollectionContainer />
                </div>
            </div>
        );
    }
}

export default UserHead;