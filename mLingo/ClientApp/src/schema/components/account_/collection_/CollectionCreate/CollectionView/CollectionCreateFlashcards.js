import React from 'react';
import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';

import CollectionFlashcard from '../../CollectionFlashcard/CollectionFlashcard';

const CollectionCreateFlashcards = ( { state, functions } ) => {

    return (
        <React.Fragment>
            {
                state.cards.map((element, index) => {
                    return <CollectionFlashcard set={element} remove={functions.removeCard} index={index} method={functions.handleCardChange} create={true}/>
                })
            }
            <div className="create__more">
                    <button onClick={functions.addEmptyCard} className="plus--button"><FaPlus /></button>
                    <div className="action__description">add more cards</div>
            </div>
            <div className="element--center">
                <button onClick={functions.submit}  className="create__button green--button"> {state.edit ? "edit collection" : "create collection"} </button>
            </div>
        </React.Fragment>
    );
};

export default CollectionCreateFlashcards;