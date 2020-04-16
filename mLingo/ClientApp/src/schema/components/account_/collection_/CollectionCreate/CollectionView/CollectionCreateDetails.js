import React from 'react'
import {
 CardBody, CardTitle } from 'reactstrap';
import Square from '../../../../../../img/collection.svg';

const CollectionCreateDetails = ( { state, functions } ) => {

    return (
            <div className="collection__details createCollection">
                <div>
                    <CardBody className="d-flex flex-nowrap">
                        <div className="flashsquare"><img src={Square} /></div>
                        <div>
                            <CardTitle> Title </CardTitle>
                            <input name="collectionTitle" type="text" size="45" placeholder="Type here" value={state.collectionTitle} onChange={functions.handleChange} required />
                            <CardTitle> Description </CardTitle>
                            <textarea name="collectionDescription"  rows="5" cols="45" placeholder="Type here" onChange={functions.handleChange} value={state.collectionDescription} required />
                            <div>
                                <button onClick={state.functionii} class="green-button"> { state.edit ? "edit collection" : "create collection" } </button>
                                <button className="green-button"> add to the study set </button>
                            </div>
                        </div>
                    </CardBody>
                </div>
            </div >
    )

};

export default CollectionCreateDetails;