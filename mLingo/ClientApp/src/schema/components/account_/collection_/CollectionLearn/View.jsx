import React from 'react'
import Square from '../../../../../img/collection.svg';
import Loading from '../../../loading/Loading';
import Slider from './slider/Slider.jsx';

export default function View({state}) {
    console.log(state)
    return (
            state.loaded ? (
                <div className="learn__dashbord">
                    <div className="learn__details">

                        <div className="learn__title">{state.collection.name}</div>
                        <img className="learn__img" src={Square} />
                        <div className="collection__description">{state.collection.description}</div>

                    </div>

                    <div className="learn__body">
                            <Slider flashcards={state.collection.cards}/>

                        <button className="learn__button"> start learning </button>

                    </div>
                </div>) : <Loading/>

    )
}
