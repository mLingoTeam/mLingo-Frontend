import React from 'react'
import { Link } from 'react-router-dom'

const CollectionCard = ({ set }) => {
    return (
        <React.Fragment>
            <Link to="/collection/" onClick={ () => { localStorage.setItem("collectionid", set.id )} }>
                <div className="card__container card--collection">
                    <div className="card__body">
                        <div className="card__title">{set.name}</div>
                        <div className="card__subtitle">Play Count: {set.playCount}</div>
                    </div>
                </div>
            </Link>
        </React.Fragment>
    );
};



export default CollectionCard;