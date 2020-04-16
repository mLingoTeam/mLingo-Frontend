import React from 'react';
import { Link } from 'react-router-dom';
import Collection_Flashcard_Component from '../CollectionFlashcard/CollectionFlashcard';

const CollectionSectionView = ( { that } ) => {

    return (
        <div className="col-9">
            Collection
            {
                that.state.loaded ? that.state.collection ? that.state.collection.map((element, index) => (
                    <Collection_Flashcard_Component set={element} remove={that.removeCard} index={index}/>
                )) : <h1>Collection removed!</h1> : <h1>loading</h1>
            }
            <Link to='/head' className="green-button">go back</Link>
            {
                that.state.collection ? <div>
                    <button className="green-button" onClick={that.removeCollection}>Remove Collection</button>
                    <button className="green-button" onClick={that.modifyCollection}>Remove Cards</button>
                    <Link className="green-button" onClick={that.editCollection} to="/create" >Edit Collection</Link>
                </div> : null
            }
        </div>

    )
}

export default CollectionSectionView;