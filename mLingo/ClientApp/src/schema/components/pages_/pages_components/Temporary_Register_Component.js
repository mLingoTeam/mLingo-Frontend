import React from "react";
import Newsletter from '../landpage_components/Newsletter';

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
                <Newsletter/>
            </div>
        );
    }
}

export default Temporary_Register_Component;