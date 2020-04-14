import React from './node_modules/react'

import { FaTrash } from './node_modules/react-icons/fa'



const Flashcard = ({ set, remove, index}) => {

    index++;

    if(index < 10 ){index = `0${index}`} ;

    const removeCard = () => {
        remove(set);
    }

    return (
        <div key={set.term} className="col-12 d-flex">
            <div className="flashcard col-5">
                <div className="flashcard--title">
                    <h2>card {index}</h2>
                    <h5>front</h5>
                </div>
                <div className="flashcard--body">
                    <div className="flashcard--">{set.term}</div>
                </div>
            </div>
            <div className="flashcard col-5">
                <div className="flashcard--title">
                    <h2>card {index}</h2>
                    <h5>back</h5>
                </div>
                <div className="flashcard--body">
                    <div className="flashcard--">{set.definition}</div>
                </div>
            </div>

            <button onClick={removeCard} className="remove-button"><FaTrash onClick={removeCard} /></button>
        </div >
    );
};

export default Flashcard;