import React, {useState, useEffect} from 'react'
import Loading from '../../../loading/Loading';
import { Link } from 'react-router-dom';
import {FaMedal} from "react-icons/fa"

export default function View({state, answer, nextFlashcard, submitSession}) {
    const [active, setActive] = useState(false)
    const [show, setShow] = useState(true)
    useEffect(()=>{
        setTimeout(() => {setShow(state => !state)}, 490)
    }, [active])
    return (
            state.loaded ? (
                <div className="learn__dashboard">
                   { state.collection.cards.length > state.index ? ( <div className="learn__body">
                            <div className={`learn__flashcard  ${active ? " flashcard--active " : "session--flashcard "} `}>
                                    <div class="learning__term">
                                        <h3>{state.currentFront ? state.collection.cards[state.index].term : show ? state.collection.cards[state.index].definition : ""}</h3>
                                    </div>
                            </div>

                        {
                           state.currentFront ? (<span className="col-12 flex--complet">
                               <button className="learn__button" onClick={() => { setActive(state => !state); answer(true); }}> I know</button>
                                <button className="learn__button" onClick={() => {  setActive(state => !state); answer(false);}}> I don't know </button>
                           </span>) : (<span className="col-12 flex--complet"> <button className="learn__button" onClick={() => {setActive(state => !state); nextFlashcard()}}> Next </button></span>)}

                    </div> ) : (<div className="session--finished">
                        <FaMedal/>
                        <div className="finished__header header--first">Congratulations</div>
                        <div className="finished__header">You've finished the lesson!</div>
                        <Link className="learn__button" onClick={submitSession} to="/learn/">submit session</Link>
                        </div>)}
                </div>) : <Loading/>

    )
}
