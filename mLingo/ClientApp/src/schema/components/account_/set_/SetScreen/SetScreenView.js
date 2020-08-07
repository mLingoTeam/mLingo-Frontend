import React from 'react';
import { Link } from 'react-router-dom';

const SetScreenView = ( { state, functions } ) => {


    return (
        <div className="set__container">
            <h2 className="set__title">{state.name}</h2>
            <div className="card__container card--set card--setscreen"></div>
        </div>

    )
}

export default SetScreenView;