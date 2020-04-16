import React from "react";
import { Link } from 'react-router-dom'

import CollectionCreateDetails from './CollectionCreateDetails/CollectionCreateDetails'
import CollectionFlashcard from '../CollectionFlashcard/CollectionFlashcard';
import { FaPlus } from 'react-icons/fa'

const CollectionCreateView = ( { state, functions } ) => {

    console.log(state)
    return (
        <div className="d-flex justify-content-center flex-wrap p-5">
            <CollectionCreateDetails set={state} handleChange={functions.handleChange} edit={state.edit}/>
            {
                state.cards.map((element, index) => {
                    return <CollectionFlashcard set={element} remove={functions.removeCard} index={index} method={functions.handleCardChange}/>
                })
            }
            <div className="col-12 d-flex justify-content-center flex-wrap align-items-center m-5">
                    <button onClick={functions.addCard} className="plus-button m-5"><FaPlus /></button>
                    <h3 className="text-center color-dark-blue">add more cards</h3>
            </div>
            <Link to="/head" onClick={functions.submit}  className="green-button"> {state.edit ? "edit collection" : "create collection"} </Link>
        </div >
    )
}

export default CollectionCreateView;