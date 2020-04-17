import React from 'react'
import Square from '../../../../../../img/collection.svg';

const CollectionCreateDetails = ( { state, functions } ) => {

    return (
            <div className="create__details">
                    <img className="details__img" src={Square} />
                    <div className="details__body">
                        <div className="details__title"> title </div>
                        <input name="collectionTitle" className="details__description" type="text" size="46" placeholder="Type here" value={state.collectionTitle} onChange={functions.handleChange} required />
                        <div className="details__title"> description </div>
                        <textarea name="collectionDescription"  className="details__description" rows="5" cols="45" placeholder="Type here" onChange={functions.handleChange} value={state.collectionDescription} required />
                        <div className="details__buttons">
                            <button onClick={state.functionii} class="green-button"> { state.edit ? "edit collection" : "create collection" } </button>
                            <button className="green-button"> add to the study set </button>
                        </div>
                    </div>
            </div >
    )

};

export default CollectionCreateDetails;