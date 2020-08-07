import React from 'react';
import { Link } from 'react-router-dom';

const SetScreenView = ( { state, functions } ) => {

    const collections = state.collections.map( collection => <li>{collection.name || 'no name of the collection'}</li>)

    return (
        <div className="set__container">
            <h2 className="set__title">{state.name}</h2>
            <form className="set__form">
                <div className="card__container card--set card--setscreen"></div>

                <div className="form__group">
                    <label htmlFor="title" className="details__title" size="46">title</label>
                    <input type="text" name="title" className="details__description details--set"/>

                    <label htmlFor="description" className="details__title">description</label>
                    <textarea type="text" name="title" className="details__description details--set" rows="5" col="45"></textarea>
                </div>

                <input type="text" name="title" placeholder="search a collection" className="details__description details--set"/>
            </form>
            <div className="set__info">
                <h2 className="set__title">{state.name}</h2>
                <ol>
                    { collections }
                </ol>
            </div>
        </div>

    )
}

export default SetScreenView;