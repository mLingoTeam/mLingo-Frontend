import React from 'react'
import {
    Card, CardText, CardBody,
    CardTitle, CardSubtitle
} from 'reactstrap';

import { FaTrash } from 'react-icons/fa'



const Flashcard = ({ set, remove}) => {


    const removeCard = () => {
        remove(set);
    }

    return (
        <div key={set.term}>
            <div className="flashcard">
                <div className="flashcard--title">
                    <h2>{set.term}</h2>
                    <h5>front</h5>
                </div>
                <div className="flashcard--body">
                    <div className="flashcard--">{set.definition || set.Definition}</div>
                </div>
            </div>
            <div className="flashcard">
                <div className="flashcard--title">
                    <h2>{set.term}</h2>
                    <h5>front</h5>
                </div>
                <div className="flashcard--body">
                    <div className="flashcard--">{set.definition || set.Definition}</div>
                </div>
            </div>

            <button onClick={removeCard}><FaTrash /></button>
        </div >
    );
};

export default Flashcard;