import React from "react";
import backgroundimg from '../../../../../img/landpage1.png'

const MainpageWelcome = props => {
    return (
        <div className="welcome__container">
            <img src={backgroundimg} className="welcome__img"/>
            <div className="welcome__details">
                <div className="welcome__title">mLingo</div>
                <p className="welcome__description"> practice your skills daily through easy to set up learning plans. Join now! </p>
                <button className="green--button">get started</button>
            </div>
        </div>
    );
};

export default MainpageWelcome;
