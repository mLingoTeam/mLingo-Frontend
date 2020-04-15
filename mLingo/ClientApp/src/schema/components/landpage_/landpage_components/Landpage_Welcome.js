import React from "react";
import backgroundimg from '../../../../img/landpage1.png'

const Landpage_Welcome = props => {
    return (
        <div className="welcome-section">
            <img src={backgroundimg} className="img-fluid"/>
            <div>
                <h2 className="main-page-h2">mLingo</h2>
                <p> practice your skills daily through easy to set up learning plans. Join now! </p>
                <button className="green-button px-5">get started</button>
            </div>
        </div>
    );
};

export default Landpage_Welcome;
