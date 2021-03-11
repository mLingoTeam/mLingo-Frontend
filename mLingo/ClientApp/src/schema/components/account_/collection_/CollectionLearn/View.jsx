import React from 'react'
import Square from '../../../../../img/collection.svg';
import Loading from '../../../loading/Loading';

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
                        <div className="learn__slider">S L I D E R</div>

                        <button className="learn__button"> start learning </button>

                    </div>
                </div>) : <Loading/>

    )
}
