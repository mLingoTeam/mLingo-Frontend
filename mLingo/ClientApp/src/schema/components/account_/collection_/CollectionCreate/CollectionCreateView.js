import React from "react";
import { Link } from 'react-router-dom'

import CollectionCreateDetails from './CollectionCreateDetails/CollectionCreateDetails'
import Collection_Flashcard_Component from '../CollectionFlashcard/CollectionFlashcard';
import { FaPlus } from 'react-icons/fa'

const CollectionCreateView = ( { that } ) => {

    return (
        <div className="d-flex justify-content-center flex-wrap p-5">
            <CollectionCreateDetails set={this.state} handleChange={this.handleChange} edit={this.state.edit}/>
            {
                this.state.cards.map((element, index) => {
                    return <Collection_Flashcard_Component set={element} remove={this.removeCard} index={index} functioni={this.handleCardChange} functionii={this.addCard}/>
                })
            }
            <div className="col-12 d-flex justify-content-center flex-wrap align-items-center m-5">
                    <button onClick={this.addCard} className="plus-button m-5"><FaPlus /></button>
                    <h3 className="text-center color-dark-blue">add more cards</h3>
            </div>
            <Link to="/head" onClick={this.submit}  className="green-button"> {this.state.edit ? "edit collection" : "create collection"} </Link>
        </div >
    )
}

export default CollectionCreateView;