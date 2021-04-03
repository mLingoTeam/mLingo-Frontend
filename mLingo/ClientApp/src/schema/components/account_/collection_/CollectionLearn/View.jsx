import React from 'react'
import Square from '../../../../../img/collection.svg';
import Loading from '../../../loading/Loading';
import Slider from './slider/Slider.jsx';
import { Link } from 'react-router-dom'
import Chart from './charts/Chart.jsx';
import {FaRegClone} from 'react-icons/fa';

export default function View({state, startSession}) {
    return (
            state.loaded ? (
                <div className="learn__dashboard">
                    <div className="learn__details col-12">

                        <span className="col-12 col-md-4">
                            <div className="learn__title">{state.collection.name}</div>
                            <img className="learn__img" src={Square} />
                        </span>

                        <div className="collection__total col-12 col-md-4">
                                <FaRegClone/>
                                <div className="collection__revised">598 revised</div>
                        </div>
                        <span className="col-12 col-md-4">
                            <Chart/>
                        </span>

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
