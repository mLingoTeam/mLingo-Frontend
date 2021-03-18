import React from 'react'
import Square from '../../../../../img/collection.svg';
import Loading from '../../../loading/Loading';
import { Link } from 'react-router-dom';

export default function View({state, answer, nextFlashcard, submitSession}) {
    return (
            state.loaded ? (
                <div className="learn__dashbord">
                   { state.collection.cards.length > state.index ? ( <div className="learn__body">
                            <div className="learn__flashcard">
                                    <h3>{state.currentFront ? state.collection.cards[state.index].term : state.collection.cards[state.index].definition}</h3>
                            </div>

                        {
                           state.currentFront ? (<span>
                               <button className="learn__button" onClick={() => { answer(true)}}> I know</button>
                                <button className="learn__button" onClick={() => { answer(false)}}> I don't know </button>
                           </span>) : ( <button className="learn__button" onClick={nextFlashcard}> Next </button>)}

                    </div> ) : (<div> <h3>Lesson finished</h3> <Link className="learn__button" onClick={submitSession} to="/learn/">submit session</Link> </div>)}
                </div>) : <Loading/>

    )
}
