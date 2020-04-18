import React from 'react';
import { Link } from 'react-router-dom';
import CollectionFlashcard from '../CollectionFlashcard/CollectionFlashcard';

const CollectionSectionView = ( { state, functions } ) => {


    return (
        <div className="collection__container">
            {
                state.loaded ? state.collection ?
                <div>
                    <div className="collection__info">
                        <div className="collection__title">{state.collection.name}</div>
                        <div className="collection__description">{state.collection.description}</div>
                    </div>
                    {
                        state.collection.cards.map((element, index) => (
                            <CollectionFlashcard set={element} index={index}/> ))
                    }

                </div> : <h1>Collection removed!</h1> : <h1>loading</h1>
            }
                <Link to='/head' className="green--button">go back</Link>
            {
                state.collection ? <div className="flex--around">
                    <button className="green--button" onClick={functions.removeCollection}>Remove Collection</button>
                    <Link className="green--button" onClick={functions.editCollection} to="/create" >Edit Collection</Link>
                </div> : null
            }
        </div>

    )
}

export default CollectionSectionView;