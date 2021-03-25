import React from 'react'
import Square from '../../../../../img/collection.svg';
import Loading from '../../../loading/Loading';
import Slider from './slider/Slider.jsx';
import { Link } from 'react-router-dom'
import Chart from './charts/Chart.jsx';

export default function View({state, startSession}) {
    return (
            state.loaded ? (
                <div className="learn__dashboard">
                    <div className="learn__details">

                        <span>
                            <div className="learn__title">{state.collection.name}</div>
                            <img className="learn__img" src={Square} />
                            <div className="collection__description">{state.collection.description}</div>
                        </span>

                        <Chart/>

                    </div>

                    <div className="learn__body">
                            <Slider flashcards={state.collection.cards}/>

                    </div>

                    <div className="col-12 flex--complet">
                        <Link className="learn__button" onClick={startSession} to="/session/"> start learning </Link>
                    </div>

                </div>) : <Loading/>
    )
}
