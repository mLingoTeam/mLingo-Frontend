import React from 'react';
import { Link } from 'react-router-dom';
import CollectionFlashcard from '../CollectionFlashcard/CollectionFlashcard';
import Loading from '../../../loading/Loading';
import { FaBook, FaTrashAlt, FaPencilAlt, FaRegFolderOpen, FaRegClone} from 'react-icons/fa';
import Chart from "./charts/Chart.jsx";

const CollectionScreenView = ( { state, functions } ) => {


    return (
        <div className="collection__container">
            {
                state.loaded ? state.collection ?
                <div>
                    <div className="collection__center">
                    {
                        state.collection ? <div className="flex--around collection__options">
                            <Link className="collection__button" onClick={functions.learn} to="/learn"> <FaBook/> Learn</Link>
                            <Link className="collection__button" onClick={functions.edit} to="/create" > <FaPencilAlt/> Edit</Link>
                            <button className="collection__button" onClick={functions.remove}><FaTrashAlt/>Remove</button>
                            <button className="collection__button"><FaRegFolderOpen/>Add to set</button>
                        </div> : null
                    }
                    <div class="collection__info">
                        <div className=""></div>
                        <div className="collection__title">{state.collection.name}</div>
                        <div className="collection__description">{state.collection.description}</div>
                        <div className="flex--between">
                            <Chart/>
                            <div className="collection__total">
                                <FaRegClone/>
                                <div className="collection__revised">598 revised</div>
                            </div>
                        </div>
                    </div>

                    </div>

                    {
                        state.collection.cards.map((element, index) => (
                            <CollectionFlashcard set={element} index={index}/> ))
                    }

                </div> : <h1>Collection removed!</h1> : <Loading/>
            }
                <Link to='/head' className="green--button m-5">go back</Link>

        </div>

    )
}

export default CollectionScreenView;