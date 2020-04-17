import React from 'react';
import { Link } from 'react-router-dom';

import CollectionFlashcard from '../../CollectionFlashcard/CollectionFlashcard';
import { FaPlus } from 'react-icons/fa'

const CollectionCreateFlashcards = ( { state, functions } ) => {

    return (
        <React.Fragment>
            {
                state.cards.map((element, index) => {
                    return <CollectionFlashcard set={element} remove={functions.removeCard} index={index} method={functions.handleCardChange} create={true}/>
                })
            }
            <div className="create__more">
                    <button onClick={functions.addCard} className="plus--button"><FaPlus /></button>
                    <div className="action__description">add more cards</div>
            </div>
            <div className="element--center">
                <Link to="/head" onClick={functions.submit}  className="create__button green--button"> {state.edit ? "edit collection" : "create collection"} </Link>
            </div>
        </React.Fragment>
    );
};

export default CollectionCreateFlashcards;