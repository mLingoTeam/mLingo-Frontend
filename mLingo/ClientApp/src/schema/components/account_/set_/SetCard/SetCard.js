import React from 'react'
import { Link } from 'react-router-dom'
import { authentication_service } from '../../../../../services/authentication/authentication';

const SetCard = ({ set }) => {
    return (
        <React.Fragment>
            <Link className="card__link" to="/studyset/" onClick={ () => { authentication_service.setIntoLocalStorage({ name: "studysetid", value: set.id })}}>
            <div className="card__container card--set">
            <div className="card__body">
                <div className="card__title">{set.name}</div>
                <div className="card__subtitle">Play Count: {set.playCount}</div>
            </div>
        </div>
            </Link>
        </React.Fragment>
    );
};

export default SetCard;