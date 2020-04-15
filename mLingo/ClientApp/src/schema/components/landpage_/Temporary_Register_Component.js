import React from "react";
import Landpage_Newsletter from './mainpage_/MainpageNewsletter/MainpageNewsletterContainer';

class Temporary_Register_Component extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div>
                    <h2 className="text-center pt-5 mt-5"> For this moment unavailable, but you can follow our newsletter and social media {":)"} </h2>
                </div>
                <Landpage_Newsletter/>
            </div>
        );
    }
}

export default Temporary_Register_Component;