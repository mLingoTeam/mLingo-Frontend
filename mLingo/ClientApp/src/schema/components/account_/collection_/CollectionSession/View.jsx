import React from 'react'
import Square from '../../../../../img/collection.svg';
import Loading from '../../../loading/Loading';

export default function View({state}) {
    return (
            state.loaded ? (
                <div className="learn__dashbord">
                    <div className="learn__body">
                            <div className="learn__flashcard">

                            </div>

                        <button className="learn__button"> I know</button>
                        <button className="learn__button"> I don't know </button>

                    </div>
                </div>) : <Loading/>

    )
}
