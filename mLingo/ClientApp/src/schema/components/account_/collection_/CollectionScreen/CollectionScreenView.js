import React from 'react';
import { Link } from 'react-router-dom';
import Collection_Flashcard_Component from '../CollectionFlashcard/CollectionFlashcard';

const CollectionSectionView = ( { state, functions } ) => {

    return (
        <div className="col-9">
            Collection
            {
                state.loaded ? state.collection ? state.collection.map((element, index) => (
                    <Collection_Flashcard_Component set={element} index={index}/>
                )) : <h1>Collection removed!</h1> : <h1>loading</h1>
            }
            <Link to='/head' className="green-button">go back</Link>
            {
                state.collection ? <div>
                    <button className="green-button" onClick={functions.removeCollection}>Remove Collection</button>
                    <Link className="green-button" onClick={functions.editCollection} to="/create" >Edit Collection</Link>
                </div> : null
            }
        </div>

    )
}

export default CollectionSectionView;